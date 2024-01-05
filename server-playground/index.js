import express from "express"
import { createFolder, logger } from "./utils/winstonLogger.js";
import { mail } from "./utils/email.js";
import dotenv from'dotenv'
import cors from 'cors'

// IMPORTING ROUTES
// import {} from 

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// creating folders for logging
createFolder()

// mail()


const PORT = process.env.PORT
const APP_URL = process.env.APP_URL

app.use(`${APP_URL}/api/auth`,)
app.get('/ping',(req,res)=>{
    res.json({success:true,message:'pong'})
})



app.listen(PORT,()=>{
    // logger.info('hy')
   console.log(`server runniog on port : ${PORT}`) 
})