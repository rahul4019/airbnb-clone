const express = require('express');
const cors = require('cors');
const connectWithDB = require('./config/db');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// connect with database
connectWithDB();

const imageDownloader = require('image-downloader');
const multer = require('multer');
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
  })
);

app.use('/uploads', express.static(__dirname + '/uploads'));

app.post('/upload-by-link', async (req, res) => {
  try {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
      url: link,
      dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const photosMiddleware = multer({ dest: 'uploads/' });

app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
  try {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace('uploads', ''));
    }
    res.json(uploadedFiles);
  } catch (error) {
    res.status(500).json({
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
