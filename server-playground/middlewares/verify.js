import {User} from '../models/userModel.js'
import jwt from "jsonwebtoken"

export const verify = async(req,res,next)=>{
    const token  = req.headers.cookie.split('=')[1]
    const decodedToken = jwt.verify(token,process.env.ACCESS_SECRET)
    // console.log(decodedToken)

    const user = await User.findById(decodedToken.id).select('-password')
    if(!user) {
        return res.status(401).json(`invalid access token`)
    }
    req.user = user;
    next()
}