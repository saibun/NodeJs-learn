/*
* Title: Route,
* Description: Handling all routes,
* Author: Saikat Chatterjee,
* Date: 14-09-23
*/

//Dependencies
const {sampleHandler} = require(`${__dirname}/sampleHandler.js`);
const {userHandler} = require(`${__dirname}/userHandler.js`);
const {tokenHandler} = require(`${__dirname}/tokenHandler.js`);
//Module scaffolding
const route_handle={
	sample: sampleHandler,
	user: userHandler,
	token:tokenHandler
};

//module exports
module.exports=route_handle;