export const myInfo = async(req,res)=>{
    // console.log(req.user)
    return res.status(200).json(req.user)
}