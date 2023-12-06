import express from "express"

const app = express();

const PORT = 1001

app.get('/', (req, res) => {
    res.status(200).json({sucess:true,message:"server running "})
});

app.listen(PORT,()=>{
   console.log(`server runniog on port : ${PORT}`) 
})