const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^\S+@\S+\.\S+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  picture: {
    type: String,
    required: true,
    default: 'https://res.cloudinary.com/rahul4019/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1695133265/pngwing.com_zi4cre.png'
  },
  bio: {
    type: String,
  },
  address: {
    type: String,
  },
  phone:{
    type: String,
    validate: {
      validator: function (v) {
        // Basic phone number format validation using a regular expression
        return /^\d{10}$/g.test(v);
      },
      message: 'Invalid phone number format',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// encrypt password before saving it into the DB
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
})

// create and return jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  })
}

// validate the password
userSchema.methods.isValidatedPassword = async function (userSentPassword) {
  return await bcrypt.compare(userSentPassword, this.password)
}

userSchema.methods.generatePasswordResetHash = async function(){
  //create hash object, then create a sha512 hash of the user's current password 
  //and return hash
  const resetToken = crypto.randomBytes(20).toString('hex'); // create a random token
  const resetHash = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex'); // create a hash of the token

  // set a reset token and its expiration time in the user document
  this.resetPasswordToken = resetHash;
  this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // set expiration time (e.g., 10 minutes)
 
  await this.save() //missing piece as changes not taking place
  
  return resetToken;
}

//verify password reset hash
userSchema.methods.verifyPasswordResetHash = function(resetHash = undefined){
  //regenerate hash and check if they are equal
  return resetHash === this.resetPasswordToken && Date.now() < this.resetPasswordExpire;
}



const User = mongoose.model("User", userSchema);

module.exports = User;
