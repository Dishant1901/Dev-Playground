import express from "express";
import { myInfo, welcomeMail } from "../controllers/public.controller.js";
import { verify } from "../middlewares/verify.js";
import { sendEmail } from "../utils/email.js";
const router = express.Router();


router.route('/my-info').get(verify,myInfo)
router.route('/send-mail').get(verify,welcomeMail)




export default router