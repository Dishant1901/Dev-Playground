import express from "express"
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();

const PORT = 1001

app.use(express.json())

app.get('/api', (req, res) =>  {
    const {name,age} = req.body;
    console.log(name,age)
    res.status(200).json({sucess:true,message:"server running ",data: {name:name,age:age}})
});

app.get('/api-dest',async(req,res)=>{
    try {
        const {destSuggest} = req.query

  //  auth header to be added in api call from microservice
   const credentials =req.headers.authorization.split(" ")[1];
   const response =  await fetch(`http://15.160.237.155:8086/alpi-ms/api/v1/suggest-destination?destSuggest=${destSuggest}`,
    {
        headers:{'Authorization': `Basic ${credentials}`}
    })

    const data = await response.json();
    console.log(data);
    return res.json(data)
    } catch (error) {
        console.log(error)
    }
})

app.get('/api-fetch',async(req,res) => {
    try {
        const {destinationId,destinationName,dateFrom,
            dateTo,adultCount,childCount,
            childrenAges,airports} = req.body;
        const data = {destinationId,destinationName,dateFrom,
            dateTo,adultCount,childCount,
            childrenAges,airports}
            const credentials =req.headers.authorization.split(" ")[1];
        const response  = await fetch('http://15.160.237.155:8086/alpi-ms/api/v1/fetch-packages',{
        method:'GET',    
        body:JSON.stringify(data),
            headers:{'Authorization': `Basic ${credentials}`}
        })    
        const apiData = await response.json()
        console.log(apiData)
        return res.json(apiData)
    } catch (error) {
        console.log(error)
        
    }
})

app.post('/api-aws',async(req,res)=>{
    try {
        const {awPricingRqSolution} = req.body
        const data = {awPricingRqSolution}
        const { occupancy, rqElements } = awPricingRqSolution;
        let toSend ={
            awPricingRqSolution:{occupancy, rqElements}
        }
        // console.log(occupancy, rqElements)
        const credentials =req.headers.authorization.split(" ")[1];

        // const response = await fetch('http://15.160.237.155:8086/alpi-ms/api/v1/package-awpricing',{
        //     method:'post',
        //     body:JSON.stringify(toSend),
        //     headers:{'Authorization': `Basic ${credentials}`},
        //     'Content-Type': 'application/json'
        // })
        
        // if (!response.ok) {
        //     // console.log(response.body)
        //     // console.log('Non-JSON Response:', response.statusText);
        //     return res.status(response.status).send(response.statusText);
        // }
        // const apidata = await resopnse.json()
        // console.log(apidata)
        // return res.json(apidata)
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT,()=>{
   console.log(`server runniog on port : ${PORT}`) 
})