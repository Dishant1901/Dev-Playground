import { sendEmail } from "../utils/email.js";
import { logger } from "../utils/winstonLogger.js";

export const myInfo = async(req,res)=>{
    // console.log(req.user)
    return res.status(200).json(req.user)
}

export const welcomeMail =async(req,res)=>{
    try {
        
        const user = req.user;
        const from = process.env.MAIL_USER
        const body = `DevDishant welcomes ${user.username} on behalf of the company!`
        
        sendEmail('Welcome aboard',[user.email.toString()],body)
    
        logger.info(`Welcome email sent to ${user.email}`)
        return res.status(200).json({sucess:true,message:`Email sent sccuessfully`})
    
    } catch (error) {
        console.log(error)
        logger.error(error)
        return res.status(500).json({sucess:false,message:`Could not send email`})
    }}