/*
* Title: Handle Req Res,
* Description: Handling Request and Response from server,
* Author : Saikat Chatterjee,
* Date: 14-09-23

*/

//Dependencies
const url = require ('url');
//object destruction
const {StringDecoder} = require('string_decoder');
const routes = require(`${__dirname}/routesHandler.js`);
const {notFoundHandler} = require(`${__dirname}/notFoundHandler.js`);

//Module Scaffolding
const req_res = {};

//handling req res
req_res.handelRequestResponse=(req,res)=>{
	//handling req 
	//geting parse
	const parseUrl = url.parse(req.url,true);
	//true --> telling parse url to consider query strings(?a=5&b=4) also.
	//console.log(parseUrl);

	const path = parseUrl.pathname;
	//console.log(path);


	const trimmedPath = path.replace(/^\/+|\/+$/g,'');
	//or
	// let path = parseUrl.pathname;
	// if(path[0]=='/' && path[path.length-1]=='/'){
	// 	path = path.slice(1,path.length-1);
	// }else{
	// 	path = path.slice(1);
	// }
	//--- it also work same as trimmedPath--(made by saikat)-----
	//console.log(trimmedPath);


	const queryStringObj = parseUrl.query;
	//console.log(queryStringObj);


	const method = req.method.toLowerCase();
	//console.log(method);

	const headerObj = req.headers;
	//console.log(headerObj);

	let decoder = new StringDecoder('utf8');
	let result = '';
	const requestProperties={
		parseUrl,
		path,
		trimmedPath,
		queryStringObj,
		method,
		headerObj
	}
	const chooseHandel = routes[trimmedPath]?routes[trimmedPath]:notFoundHandler;
	chooseHandel(requestProperties,(statuscode,payload)=>{
		 statuscode = typeof statuscode ==='number' ? statuscode :500;
		 payload = typeof payload === 'object' ? payload : {};

		let payloadString = JSON.stringify(payload);

		//return the final response
		res.writeHead(statuscode);
		res.end(payloadString);

	});
	


	// req.on('data',(data)=>{
	// 	result += decoder.write(data);
	// });
	// req.on('end',()=>{
	// 	result += decoder.end();
	// 	console.log(result);
	// 	res.end("hello Master!, start learning Node js with a beautiful day");
	// });
	
};

//Export module
module.exports = req_res;

