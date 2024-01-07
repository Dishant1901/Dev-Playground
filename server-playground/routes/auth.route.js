import express from "express";
import { login, logout, register, resetPassword, updatePassword } from "../controllers/auth.controller.js";
import { verify } from "../middlewares/verify.js";
const router = express.Router();


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/test-verify').get(verify)
router.route('/logout').get(verify,logout)
router.route('/update-password').post(verify,updatePassword)
router.route('/reset-password').post(resetPassword)




export default router