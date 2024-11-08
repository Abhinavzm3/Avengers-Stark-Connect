
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {createPost,deletePost,updatePost,getAllPost,getPostbyId, like} from '../controllers/blog.controller.js'
const router = express.Router();

router.route("/create").post(isAuthenticated,createPost);
router.route("/get").get(getAllPost);
router.route("/:id").get(getPostbyId);
router.route("/update/:id").put(isAuthenticated, updatePost);
router.route("/delete").post(isAuthenticated,deletePost);
router.route("/liked/:id").post(isAuthenticated,like);

export default router;

