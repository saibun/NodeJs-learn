const express = require("express");
const app = express();

app.use(express.raw());// raw function content type will be "application/octet-stream";

app.post("/home",(req,res)=>{
    res.send("post methode home url");
    console.log(req.body);// will return the raw data mean buffer
    console.log(req.body.toString());//convert the buffer streem into string format
})

app.listen(3000,()=>{
    console.log("3000 port listning...");
})