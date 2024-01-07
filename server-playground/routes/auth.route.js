import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { verify } from "../middlewares/verify.js";
const router = express.Router();


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/test-verify').get(verify)




export default router