import express from "express"

const app = express();

const PORT = 1001

app.use(express.json())

app.get('/api', (req, res) =>  {
    const {name,age} = req.body;
    console.log(name,age)
    res.status(200).json({sucess:true,message:"server running ",data: {name:name,age:age}})
});

app.listen(PORT,()=>{
   console.log(`server runniog on port : ${PORT}`) 
})