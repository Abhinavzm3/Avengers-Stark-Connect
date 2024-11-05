
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { RemoveBookMark,AddBookMark,GetAllBookMark } from "../controllers/bookmark.controller.js";

const router = express.Router();

router.route("/add").post( AddBookMark);
router.route("/get").post(GetAllBookMark);
router.route("/remove").post( RemoveBookMark);

export default router;
