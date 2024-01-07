import express from "express";
import { myInfo } from "../controllers/public.controller.js";
import { verify } from "../middlewares/verify.js";
const router = express.Router();


router.route('/my-info').get(verify,myInfo)




export default router