const express = require('express');
const router = express.Router();


const {
  register,
  login,
  logout,
  googleLogin,
} = require('../controllers/userController');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/google/login').post(googleLogin)
router.route('/logout').get(logout);



module.exports = router;
