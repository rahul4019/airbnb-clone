const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: '/tmp' });


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
router.route('/upload-picture').post(upload.single('picture', 1), uploadPicture)
router.route('/update-user').put(updateUserDetails).patch(updateUserDetailsN);
router.route('/update-password').post(changePassword)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(resetPassword)

router.route('/logout').get(logout);


module.exports = router;
