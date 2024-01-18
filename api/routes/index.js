const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/Places')); // Destination folder for storing the uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Naming the file
  },
});

// multer
// const  upload = multer({ dest: '/tmp' });

const upload = multer({ storage });

router.get('/', (req, res) => {
  res.status(200).json({
    greeting: 'Hello from airbnb-clone api',
  });
});

// upload photo using image url
router.post('/upload-by-link', async (req, res) => {
  try {
    const { link } = req.body;
    let result = await cloudinary.uploader.upload(link, {
      folder: 'Airbnb/Places',
    });
    res.json(result.secure_url);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

// upload images from local device
// router.post('/upload', upload.array('photos', 100), async (req, res) => {
//   try {
//     let imageArray = [];

//     for (let index = 0; index < req.files.length; index++) {
//       let { path } = req.files[index];
//       let result = await cloudinary.uploader.upload(path, {
//         folder: 'Airbnb/Places',
//       });
//       imageArray.push(result.secure_url);
//     }

//     res.status(200).json(imageArray);
//   } catch (error) {
//     console.log('Error: ', error);
//     res.status(500).json({
//       error,
//       message: 'Internal server error',
//     });
//   }
// });


//upload from local to server instead of cloudinary
router.post('/upload', upload.array('photos', 100), async (req, res) => {
  try {
    let imageArray = [];

    for (let index = 0; index < req.files.length; index++) {
      let { filename } = req.files[index];
      imageArray.push(`/uploads/Places/${filename}`);
    }
    // console.log(imageArray)
    res.status(200).json(imageArray);
  } catch (error) {
    // console.log(req.files);
    console.log('Error: ', error);
    res.status(500).json({
      error,
      message: 'Internal server error',
    });
  }
});


router.use('/user', require('./user'));
router.use('/places', require('./place'));
router.use('/bookings', require('./booking'));


module.exports = router;
