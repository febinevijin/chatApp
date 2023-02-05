import express from "express";
import { accessChat, addToGroup, createGroup, fetchChat, removeFromGroup, renameGroup } from "../controllers/chatControllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').post(protect,accessChat)
router.route('/').get(protect,fetchChat)
 router.route('/group').post(protect,createGroup)
 router.route('/rename').put(protect,renameGroup)
 router.route('/groupAdd').put(protect,addToGroup)
 router.route("/removeFromGroup").put(protect, removeFromGroup);

export default router;
