const express = require("express");
const app = express();

const router = express.Router();
app.use(router);
//express.Router provide routeing mechanism with some proporties

router.get("/Home",(req,res)=>{ res.send("routing get method"); })

router.post("/home",(req,res)=>{ res.send("routing post method"); })

app.listen(3000,()=>{ console.log("server running...");})



