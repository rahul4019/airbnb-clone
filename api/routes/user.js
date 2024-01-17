const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// const upload = multer({ dest: '/tmp' });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/Users'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });


const {
  register,
  login,
  logout,
  googleLogin,
  uploadPicture,
  updateUserDetails,
  updateUserDetailsN,
  changePassword,
  forgotPassword,
  resetPassword
} = require('../controllers/userController');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/google/login').post(googleLogin)
router.route('/upload-picture').post(upload.single('picture'), uploadPicture)
router.route('/update-user').put(updateUserDetails).patch(updateUserDetailsN);
router.route('/update-password').post(changePassword)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(resetPassword)

router.route('/logout').get(logout);


module.exports = router;
