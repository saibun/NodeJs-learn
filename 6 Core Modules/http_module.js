const http = require('http');
//console.log(http);

const server = http.createServer((req,res)=>{
	if(req.url==='/'){
		res.write("This is home page");
		res.end();
	}else if (req.url==='/about'){
		res.write("This is about page");
		res.end();
	}
	else{
		res.write("No Page Found");
		res.end();
	}
});
//console.log(server);
server.listen(3000);//creating http port at 3000
console.log('listening on port 3000'); 