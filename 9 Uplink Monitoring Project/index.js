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



//app object - Module scaffolding;
const app = {};

//configuration
app.config = {
	port: 9090
};

//create server
app.createServer = ()=>{
	const server = http.createServer(app.handelServer);
	server.listen(app.config.port,()=>{
		console.log("server running ...");
	})
};

//Handel server
app.handelServer = handelRequestResponse;

//call server function
app.createServer();