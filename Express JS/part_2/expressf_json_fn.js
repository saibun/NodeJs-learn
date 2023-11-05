const express = require("express"); 
const app = express();

app.use(express.json())//use is a function of express into which we will write which function we what to use
/**
 * we get a {} (blank object by using express.json() because when we hit the post url with some raw data into header contenttype is textplain. But express.json() not able to handle textplain it is handling application/json. so we have to change into header. we have to make content type  application/json)
 */
app.post("/home",(req,res)=>{
    console.log(req.body);//it will return a blank object unting we given any input into json format. and untill change the content type to application/json
    console.log(req.body.name);
    res.send("this is home page of post method");
})

app.listen(3000,()=>{
    console.log("3000 port working...");
})