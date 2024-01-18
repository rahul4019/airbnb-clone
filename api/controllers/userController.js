const User = require('../models/User');
const cookieToken = require('../utils/cookieToken');
const bcrypt = require('bcryptjs')
// const cloudinary = require('cloudinary').v2;
const crypto = require("crypto");
const sendEmail = require('../utils/sendEmail');


// Register/SignUp user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      });
    }

    // check if user is already registered
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: 'User already registered!',
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

// Login/SignIn user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check for presence of email and password
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required!',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'User does not exist!',
      });
    }

    // match the password
    const isPasswordCorrect = await user.isValidatedPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Email or password is incorrect!',
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

// Google Login
exports.googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400), json({
        message: 'Name and email are required'
      })
    }

    // check if user already registered
    let user = await User.findOne({ email });

    // If the user does not exist, create a new user in the DB  
    if (!user) {
      user = await User.create({
        name,
        email,
        password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10)
      })
    }

    // send the token
    cookieToken(user, res)
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
}

// Upload picture
// exports.uploadPicture = async (req, res) => {
//   const { path } = req.file
//   try {
//     let result = await cloudinary.uploader.upload(path, {
//       folder: 'Airbnb/Users',
//     });
//     res.status(200).json(result.secure_url)
//   } catch (error) {
//     res.status(500).json({
//       error,
//       message: 'Internal server error',
//     });
//   }
// }

//upload locally 
exports.uploadPicture = async (req, res) => {
  try {
    const { filename } = req.file;
    res.status(200).json(`/uploads/Users/${filename}`);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({
      error,
      message: 'Internal server error',
    });
  }
};



// update user
exports.updateUserDetails = async (req, res) => {
  try {
    const { name, password, email, bio, picture } = req.body

    // console.log(req.body);
    // console.log(bio);
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404), json({
        message: 'User not found'
      })
    }

    // user can update only name, only password,only profile pic or all three

    user.name = name;
    user.bio = bio;
    if (picture && !password) {
      user.picture = picture;
    } else if (password && !picture) {
      user.password = password;
    } else {
      user.picture = picture;
      user.password = password;
    }
    
    const updatedUser = await user.save();
    cookieToken(updatedUser, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }, error)
  }
}


exports.updateUserDetailsN = async(req, res) => {
  try {
    const { name, bio, email, phone, address, picture } = req.body


    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404), json({
        message: 'User not found'
      })
    }

    if (phone && !/^\d{10}$/g.test(phone)) {
      return res.status(400).json({
        error: 'Invalid phone number format',
      });
    }

    if (picture) {
      user.picture = picture;
    }

    user.name = name;
    user.bio = bio;
    user.email = email;
    if(phone){
      user.phone = phone;
    }
    user.address = address;
    
    const updatedUser = await user.save();
    if(updatedUser){
      cookieToken(updatedUser, res);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error }, error)
  }

}


exports.changePassword = async(req, res) => {

  try {
    const { oldPassword, newPassword, email } = req.body;
    console.log(req.body);


    const user = await User.findOne({ email:email });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      })
    }

    const isOldPasswordValid = await user.isValidatedPassword(oldPassword);
    console.log(isOldPasswordValid);
    if(!isOldPasswordValid){
      return res.status(401).json({
        error: 'Old Password didn\'t match with old one'
      })
    }

      user.password = newPassword;
      user.save();
  
      return res.status(200).json({
        message: "Password Changed successfully"
      });


  }
  catch (error){
    console.error(error);
    return res.status(500).json({
      message: "Password Change Failed",
      error: error
    });

  }

}


exports.forgotPassword = async(req, res) => {

  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      })
    }


    const resetToken = await new User(user).generatePasswordResetHash()
    
    const resetLink = `${process.env.CLIENT_URL}/reset?token=${resetToken}`
    
    let emailMessage = '<h4><b>Reset Password</b></h4>' +
    '<p>To reset your password, Click the below link:</p>' +
    '<a href="'+resetLink + '">'+resetLink+'</a>' +
    '<br><br>' +
    '<p>The above lInk will expire within 10 minutes</p>'
    '<br><br>' +
    '<p>AirBnb Team</p>';
    
    const sendMail = await sendEmail(email, "Reset Your Password",'',emailMessage);


    if(sendMail){
      return res.status(200).json({
          message: "Successfully Sent Email. Check Your Inbox"
      });
    }
    else{
      return res.status(400).json({
        error: "Email Sending failed"
    });
    }
  }
  catch (error){
    console.error(error);
  }

}



exports.resetPassword = async(req, res) => {

  try {
    const {token, newPassword} = req.body;
    // console.log(Date.now());

    // hashing the token received to match with resetPasswordToken
    const resetHash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

    // get user object
    const user = await User.findOne({ resetPasswordToken: resetHash, resetPasswordExpire: { $gt: new Date().toISOString() }  });

    if (!user) {
      return res.status(404).json({
        error: 'Invalid link. The link might be expired',
      })
    }

    if (user.verifyPasswordResetHash(resetHash)) {
      user.password = newPassword;
      user.save()
      return res.status(200).json({
        message: "Password Reset success"
      });
    }
    else{
      console.log("Unable to verify probably invalid link");
      return res.status(400).json({
        error: "You have provided an invalid reset link"
      });
    }

  }
  catch (error){
    console.error(error);
    return res.status(500).json({
      error: "Password Reset Failed"
    });
  }

}



// Logout
exports.logout = async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,   // Only send over HTTPS
    sameSite: 'none' // Allow cross-origin requests
  });
  res.status(200).json({
    success: true,
    message: 'Logged out',
  });
};
