import express from "express";
import {
  allUsers,
  loginUser,
  registerUser,
  upImage,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
// import upload from "../utils/multer.js"
import multer from "multer";

const router = express.Router();
// Configure the multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory to which the file will be saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix); // Specify the filename of the uploaded file
  },
});

const upload = multer({ storage: storage });

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", loginUser);
router.post("/image", upImage);

export default router;
