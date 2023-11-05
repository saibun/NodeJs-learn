const express = require("express");

const app = express();

app.use(express.urlencoded());//content type will be "application/x-www-form-urlencoded

app.post("/home",(req,res)=>{
    res.send(req.body);
    console.log(req.body);
})

app.listen(3000,()=>{
    console.log("3000 port working...");
})