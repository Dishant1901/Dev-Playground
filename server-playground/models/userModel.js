import mongoose , {Schema}from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username:{
        type:String,
        required: [true,"Please provide username"],
    },

    email:{
        type:String,
        required: [true,"Please provide email"],
        unique:true,
    },

    password:{
        type:String,
        required: [true,"Please provide psssword"],
        
    },
},
{
    timestamps: true 
}
)

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10); // gen salt for secyrity
    this.password =  await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.genAccessToken = async function(){
    return jwt.sign({
        id:this._id,
        email:this.email,
        username : this.username,
    },
    process.env.ACCESS_SECRET,
    {
        expiresIn: process.env.ACCESS_EXPIRE,
    }
    )
}


export const User = mongoose.model('User',userSchema)