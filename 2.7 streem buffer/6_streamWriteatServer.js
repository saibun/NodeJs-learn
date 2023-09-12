const fs = require('fs');
const http = require('http');

const server = http.createServer((req,res)=>{
	let readStream = fs.createReadStream(`${__dirname}/bigdata.txt`);
	readStream.pipe(res);
})
server.listen(3030);
console.log("server listening");