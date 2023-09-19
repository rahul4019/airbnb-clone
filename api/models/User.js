const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
    default: 'https://res.cloudinary.com/rahul4019/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1695133265/pngwing.com_zi4cre.png'
  }
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


const User = mongoose.model("User", userSchema);

module.exports = User;
