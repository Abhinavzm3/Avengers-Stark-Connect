
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { bot } from "../chatBot/bot.js";
 
const router = express.Router();

router.route("/chat").post(isAuthenticated, bot);
 

export default router;

