const express = require("express");
const app = express();

app.use(express.text());// content type will be text/plain

app.post("/home",(req,res)=>{
    res.send(req.body);
})

app.listen(3000,()=>{
    console.log("3000 port working");
})
