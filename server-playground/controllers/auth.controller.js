import {User} from '../models/userModel.js'

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