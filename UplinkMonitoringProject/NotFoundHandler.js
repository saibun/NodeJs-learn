/*
* Title: Not FoundHandler,
* Description: Handling all Not FoundHandler,
* Author: Saikat Chatterjee,
* Date: 14-09-23
*/

//Dependencies

//Module scaffolding
const handler = {};

//sampleHandler Function
handler.notFoundHandler = (requestProperties,callback)=>{
	console.log(requestProperties);
	callback(404,{
		message: 'No Found Handler',
	});
}

//export
module.exports = handler;