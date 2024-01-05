import {} from '../models/userModel.js'

export const register = async(req,res)=>{
    const {username,email,password} = req.body;

    if(!username || !password || !email) {
        return res.status(400).json({sucess:false,message:`All credetials are requred`})
    }

    
} 