const express = require('express');
const cors = require('cors');
const connectWithDB = require('./config/db');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// connect with database
connectWithDB();

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// multer
// const storage = multer.memoryStorage;
const upload = multer({ dest: '/temp' });

const fs = require('fs');
const app = express();

app.use(express.json());
app.use(cookieParser());

const whiteList = [
  'https://airbnb-clone0.netlify.app',
  'https://airbnb-1.netlify.app',
  'http://localhost:5173',
];

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (whiteList.indexOf(origin !== -1)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by cors'));
      }
    },
    exposedHeaders: ['set-cookie'],
  })
);

app.use('/uploads', express.static(__dirname + '/uploads'));

app.post('/upload-by-link', async (req, res) => {
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

app.post('/upload', upload.array('photos', 100), async (req, res) => {
  try {
    let imageArray = [];
    console.log('multer upload: ');

    for (let index = 0; index < req.files.length; index++) {
      console.log('Upload started...');
      let { path } = req.files[index];
      let result = await cloudinary.uploader.upload(path, {
        folder: 'Airbnb/Places',
      });
      imageArray.push(result.secure_url);
    }

    res.status(200).json(imageArray);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({
      error,
      message: 'Internal server error',
    });
  }
});

// use express router
app.use('/', require('./routes'));

app.listen(process.env.PORT || 8000, (err) => {
  if (err) {
    console.log('Error in connecting to server: ', err);
  }
  console.log(`Server is running on port no. ${process.env.PORT}`);
});

module.exports = app;
