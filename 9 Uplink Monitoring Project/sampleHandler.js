/*
* Title: sampleHandler,
* Description: Handling all sampleHandler,
* Author: Saikat Chatterjee,
* Date: 14-09-23
*/

//Dependencies

//Module scaffolding
const handler = {};

//sampleHandler Function
handler.sampleHandler = (requestProperties,callback)=>{
	console.log(requestProperties);
	callback(200,{
		message: 'This is a sample paylod',
	});
}

//export
module.exports = handler;