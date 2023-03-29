import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/jwtToken.js";
// import cloudinary from "../utils/cloudinary.js";
import cloudinary from "cloudinary";
import path from "path"
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(404);
    throw new Error("Please enter all required fields");
  }
  // console.log(pic);
  // console.log("oneeeeeeeeeeeeee");
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(404);
    throw new Error("User already exists");
  }
  // console.log("twooooooooooooo");
  // try {
  //  const profile = await cloudinary.v2.uploader.upload(pic, {
  //    folder: "profileImages",
  //  });
  // } catch (error) {
  //   console.log(error,'gdfgdg');
  // throw new Error(error);
  // }

  // let profileUrl = profile.secure_url;
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("failed to create user");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("invalid Emali or password");
  }
});

export const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});


export const upImage = asyncHandler(async (req, res) => {
  try {
    const file = req.files.image;
    const tempFilePath = `uploads/${file.name}`;
    const writeStream = fs.createWriteStream(tempFilePath);
    writeStream.write(file.data);
    writeStream.end();

    writeStream.on("finish", () => {
      console.log(`File saved to ${tempFilePath}`);
      res.send("File uploaded");
    });

     const profile = await cloudinary.v2.uploader.upload(tempFilePath, {
       folder: "profileImages",
     });
      console.log(profile.secure_url);
      console.log(profile.public_id);

    // setTimeout(() => {
    //   // delete the temporary file after sending the response
    //   fs.unlink(tempFilePath, (err) => {
    //     if (err) {
    //       console.error(`Error deleting ${tempFilePath}: ${err}`);
    //     } else {
    //       console.log(`Deleted ${tempFilePath}`);
    //     }
    //   });
    // }, 5000);
  } catch (error) {
    console.log(error.message);
  }

  
  // try {
  //  const profile = await cloudinary.v2.uploader.upload(req.file.path, {
  //    folder: "profileImages",
  //  });
  //   console.log(profile.secure_url);
  //   console.log(profile.public_id);

  // } catch (error) {
  //   console.log(error,'gdfgdg');
  // throw new Error(error);
  // }
})