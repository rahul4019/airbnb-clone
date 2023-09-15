const User = require('../models/User');
const cookieToken = require('../utils/cookieToken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'name, email and password are required',
      });
    }

    // check if user already registered
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: 'User already registered',
      });
    }

    user = await User.create({
      name,
      email,
      password,
    });

    // after creating new user in DB send the token
    cookieToken(user, res);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check for presence of email and password
    if (!email || !password) {
      return res.status(400).json({
        message: 'email and password are required',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: 'User does not exist',
      });
    }

    // match the password
    const isPasswordCorrect = await user.isValidatedPassword(password);

    if (!isPasswordCorrect) {
      res.status(401).json({
        message: 'email or password is incorrect',
      });
    }

    // if everything is fine we will send the token
    cookieToken(user, res);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};
 
exports.logout = async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  req.logout();
  res.status(200).json({
    success: true,
    message: 'Successfully logged out',
  });
};
