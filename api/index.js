const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/User");
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

mongoose.connect(process.env.DB_URL);

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
  });
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = await req.body;

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
    res.status(400).json({
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
