const fs = require('fs');

// fs.readFile('bigdata.txt','utf8',(err,data)=>{
// 	try{
// 		console.log(data);
// 	}catch(err){
// 		console.log(err.message);
// 	}
// })
var read_a_file = fs.createReadStream(__dirname+'/bigdata.txt');

read_a_file.on('data',(data)=>{
	console.log(data);
})
console.log("hello");
