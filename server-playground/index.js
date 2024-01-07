import express from "express"
import { createFolder, logger } from "./utils/winstonLogger.js";
// import { mail } from "./utils/email.js";
import dotenv from'dotenv'
import cors from 'cors'
import mongoose from "mongoose";

// IMPORTING ROUTES
import authRoute from "../server-playground/routes/auth.route.js" 
import publicRoute from '../server-playground/routes/public.route.js'

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// creating folders for logging
createFolder()

// mail()


const PORT = process.env.PORT
const APP_URL = process.env.APP_URL
const MONGO_URI = process.env.MONGO_URI

app.use(`${APP_URL}/api/auth`,authRoute)
app.use(`${APP_URL}/api/public`,publicRoute)

app.get('/ping',(req,res)=>{
    res.json({success:true,message:'pong'})
})

//db connection
mongoose
    .connect(MONGO_URI, {
        
    })
    .then(() => {
        console.log("DB connection successful");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT,()=>{
    // logger.info('hy')
   console.log(`server runniog on port : ${PORT}`) 
})