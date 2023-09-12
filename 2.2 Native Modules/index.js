const fs = require("fs");
// if(fs){
// 	console.log(true);
// }else{
// 	console.log(false);
// }
//--------------------------------------------------------
// fs.writeFile("saikat1.tx","saikat learn node 1",(err)=>{
// 	if(err) throw "error arrive";
// 	console.log("The file working")
// });
fs.readFile("saikat1.tx","utf8",(err,data)=>{
	if(err) throw err;
	console.log(data);

});

