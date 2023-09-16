const express = require('express');
const router = express.Router();


const {
  register,
  login,
  logout,
  googleLogin,
} = require('../controllers/userController');

router.route('/register').post(register);
router.route('/google/login').post(googleLogin)
router.route('/login').post(login);
router.route('/logout').get(logout);



module.exports = router;
