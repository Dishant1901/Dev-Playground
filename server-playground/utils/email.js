import nodemailer from 'nodemailer'
import {  logger } from "./winstonLogger.js";

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'dishantsinghom@gmail.com' ,
        pass: 'egrdsbjozwjtwkub',
    }
})

let recipientsList = ["dishant.singh1901@gmail.com","shraddhabajpai882002@gmail.com","gitanjali9300@gmail.com","20eo1022@mitsgwl.ac.in","dishantswayam@gmail.com"]

const mailOptions = {
    from:'dishantsinghom@gmail.com',
    // to:"dishant.singh1901@gmail.com",
    cc:recipientsList,
    subject:'test email with cc',
    text:'demo email with multiple recipients at once !! if the recipient finds this emil then let me know via text msg! ⌛⌛⌛'
}

export const mail =()=>{
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            logger.error(err);
        } else{
            logger.info(`email sent to ${mailOptions.to} with response: ${info.response}`)
        }
    })
} 