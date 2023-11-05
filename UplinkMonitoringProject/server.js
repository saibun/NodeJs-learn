/*
* Title: Uplink Monitoring,
* Description: A RESTfull API to monitoring up time or down time of user define links,
* Author: Saikat Chatterjee,
* Date: 14-09-23
*/

//Dependencies
const http = require('http');
//object destructing
const {handelRequestResponse} = require(`${__dirname}/handelReqRes.js`);
//const lib = require('./lib/data.js');
const {notification} = require(`${__dirname}/notification.js`);




//app object - Module scaffolding;
const app = {};

//configuration
app.config = {
	port: 9090
};

//TODO @:Phone notification
// notification('8536912548','Hello World',(err)=>{
// 	console.log(err);
// })


//write file
//@TODO: Erase later--
// lib.create('test','text3',{loveBirds: 'saikat+Barnali',year: 6},(err)=>{
// 	console.log(err)
	
// });
// lib.create('test','text2',{name: 'Barnali', lastname: 'chatterjee', vill: 'fazalpur'},(err)=>{
// 	console.log(err)
	
// });

//read file
// lib.dataRead('test','text1',(data)=>{
// 	console.log(data);
// })

//update file
// lib.updateFile('test','text2',{"name":"saikat","lastname":"chatterjee","vill":"fazalpur"},(result)=>{
// 	console.log(result);
// });

//delete file
// lib.delete('test','text31',(result)=>{
// 	console.log(result)
// })


//create server
app.createServer = ()=>{
	const server = http.createServer(app.handelServer);
	server.listen(app.config.port,()=>{
		console.log(`${app.config.port} server running ...`);
	})
};

//Handel server
app.handelServer = handelRequestResponse;

//call server function
app.createServer();