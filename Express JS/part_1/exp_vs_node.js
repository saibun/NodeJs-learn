//first we see how we write code for creating a port and url
const http = require("http");
const server = http.createServer((req,res)=>{
    if(req.url === "/login" && req.method === "GET"){
        res.write("this is login page with get method");
        res.end();
    }else if(req.url === "/login" && req.method === "POST"){
        res.write("this is login page with post method");
        res.end();
    }else{
        res.write("Error");
        res.end();
    }
})
// server.listen(3000,()=>{
//     console.log(`listining 3000`);
// })
// At upper code we see how we create port and url in node js
//In below we will do the same things in express js but befor that first install express by npm install express.
const express = require("express");//it return a function
const app = express(); //it return a object
app.get("/login",(req,res)=>{
    res.send("this is login page with get method");
});
app.post("/login",(req,res)=>{
    res.send("this is login page with post method");
});
app.listen(3000,()=>{
    console.log("listening 3000 port");
})


