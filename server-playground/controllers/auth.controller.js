import {User} from '../models/userModel.js'
import { sendEmail } from '../utils/email.js';
import { logger } from '../utils/winstonLogger.js';

export const register = async(req,res)=>{
    const {username,email,password} = req.body;

    try {
        
        if(!username || !password || !email) {
            return res.status(400).json({sucess:false,message:`All credetials are requred`})
        }
    
        const existUser =await User.findOne({email:email})
        if(existUser){
            return res.status(403).json({sucess:false,message:`User with this email already exist`})
        }
    
        const user = await User.create({
            username,
            email,
            password
        })
    
        if(!user) {
            return res.status(502).json({success:false , messgae:`soething went werong`})
        }
    
        return res.status(200).json({suces:true,user})
        
    } catch (error) {
        console.log(error)
        res.json({error:error.message})

    }
} 

export const login = async(req,res)=>{
    const {email,password } = req.body;
    try {
        
        if(!email || !password){
            return res.status(400).json({sucess: false,message:`credentials required`})
        }
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({sucess: false,message:`user with this emial not found`})
        }

        const isPassOk = await user.matchPassword(password)

        if(!isPassOk){
            return res.status(400).json({sucess: false,message:`invalid password`})
        }

        const accessToken = await user.genAccessToken()
        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie('accessToken',accessToken,options)
            .json({accessToken,loggedInUser:user})

    } catch (error) {
        console.log(error)
        return res.status(500).json({sucess:false,message:`error:${error.message}`})
    }
}

export const logout = (req,res)=>{
    try {
        console.log(req.headers)
        req.headers.cookie = ''
        console.log(req.headers)
        return res.status(200).json({sucess:true,message:`Usr logged out sucessfully`})
    } catch (error) {
        return res.status(500).json({sucess:false,message:`Internal server error`})
    }
}

export const updatePassword = async(req,res)=>{
    const {oldPassword,newPassword} = req.body;
    console.log(req.user)
    const user = await User.findById(req.user._id)
    console.log(`user from db call: ${user}`)
    const passOk = user.matchPassword(oldPassword)

    if(!passOk){
        return res.status(400).josn({sucess:false,message:`Invalid ol passowrd`})
    }

    user.password = newPassword
    await user.save({validateBeforeSave:false})

    return res.status(200).json({sucess:true,message:`Password changed successfully`})
}

export const resetPassword = async(req,res)=>{
    const {email}  = req.body;

/*
    1. GET USER EMAIL
    2. CREATE RESET PASSWORD
    3. FIND USER WITH EMIAL === EMAIL
    4. CHANGE PASSWORD TO RESET PASSWORD
    5. EMAIL USER HIS CHANGES PASSOWRD    
*/

    // function to create reset code
   try {
     const resetCodeGenerator = (email)=>{
         const emailString = email.split('@')[0];
 
         return emailString+Math.floor(Math.random()*9999)+1
     }
 
     const resetCode = resetCodeGenerator(email)
     // console.log(resetCode)
 
     const user = await User.findOne({email});
     if(!user){
         return res
             .status(400)
             .json({
                 sucess:false,
                  message:`User with email: ${email} not found`
                 })
     }
     user.password = resetCode;
     await user.save({validateBeforeSave:false});
 
     const body = `Hello ${user.username} , As per your request your password has been reset to: "${resetCode}". Use this password to login and update your password! `
     sendEmail(`Reset Password`,[email.toString()],body)
 
     return res.status(200).json({sucess:true,message:'Email sent to reset password'})
 
 
   } catch (error) {
    console.log(error)
    logger.error(error)
    return res.status(500).json({sucess:false,message:`Could not send email`})
   }
}