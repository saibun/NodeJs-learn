const http = require('http');

const server = http.createServer((req,res)=>{
	if(req.url==='/'){
		res.write(`<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<title>Demo</title>
			</head>
			<body>
				<form action="/process" method="POST">
		 				<input type="text" name="message ">
				</form>

			</body>
			</html>`);
		res.end();
	}else if(req.url==='/process' && req.method==='POST'){
		const body = [];
		req.on('data',(data)=>{
			body.push(data);
		});
		req.on('end',()=>{
			let fullBody = body.join(" ").toString();
			console.log(fullBody);
			res.write("process page");
			res.end();
		});
		
		
	}else{
		res.write("Error page");
		res.end();
	}
});
server.listen(3030);
console.log("server start");