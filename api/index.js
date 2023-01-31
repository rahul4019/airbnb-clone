const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(process.env.DB_URL);

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
  });
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(422).json({
      message: error,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const validatedPassword = await bcrypt.compare(password, user.password);
      if (validatedPassword) {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRY,
          }
        );

        user.password = undefined;

        const options = {
          expires: new Date(
            Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000
          ),
          httpOnly: true, // makes the token available only to backend
        };

        res.cookie("token", token, options).json(user);
      } else {
        res.status(401).json("password didn't match");
      }
    } else {
      res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({});
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { name, email, _id } = await User.findById(decoded.id);
      res.json({ name, email, _id });
    } else {
      res.json(null);
    }
  } catch (err) {
    console.log(error);
  }
});

app.post("/logout", async (req, res) => {
  try {
    res.cookie("token", "").json(true);
  } catch (err) {}
});

app.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

const photosMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  try {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads",''));
    }
    res.json(uploadedFiles);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(4000, (err) => {
  if (err) {
    console.log("Error in connecting to server: ", err);
  }
  console.log(`Server is running on port no. ${4000}`);
});
