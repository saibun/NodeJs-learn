/*
* Title: checkHandler,
* Description: create check folder to check up/down links,
* Author: Saikat Chatterjee,
* Date: 13-10-23
*/

//Dependencies
const lib = require('./lib/data.js');
const {hash, createToken} = require('./utilities.js');
const {parseJson} = require('./utilities.js');
const tokenHandler = require('./tokenHandler.js');
const env = require('./enviorment.js');

//Module scaffolding
const handler = {};

//sampleHandler Function
handler.checkHandler = (requestProperties,callback)=>{
	const acceptMethods = ['get','post','put','delete'];
	if(acceptMethods.includes(requestProperties.method)){
		handler._check[requestProperties.method](requestProperties,callback);
	}else{
		callback(405,{
			message: 'Invalid method',
		});
	}
	
}
//scaffolding for handling methods
handler._check={};


handler._check.post=(requestProperties,callback)=>{
	let protocal = typeof requestProperties['postBody']['protocal'] === 'string' && ['http','https'].includes(requestProperties['postBody']['protocal']) ? requestProperties['postBody']['protocal'] : false;

	let url = typeof requestProperties['postBody']['url'] === 'string' && requestProperties['postBody']['url'].length > 1  ? requestProperties['postBody']['url'] : false;

//TODO: make method lower case
	let inp_method = typeof requestProperties['postBody']['method'] === 'string' && ['get','put','post','delete'].includes(requestProperties['postBody']['method']) ? requestProperties['postBody']['method'] : false;

	let status = typeof requestProperties['postBody']['status'] === 'object' && Array.isArray(requestProperties['postBody']['status']) ? requestProperties['postBody']['status'] : false;

	let duration = typeof requestProperties['postBody']['time'] === 'number' && requestProperties['postBody']['time']>= 1 && requestProperties['postBody']['time'] <= 5 ? requestProperties['postBody']['time']:false;

	if(protocal && url && inp_method && status && duration){
		const tokenId = typeof requestProperties['headerObj']['tokenid'] === 'string' && requestProperties['headerObj']['tokenid'].length === 20 ? requestProperties['headerObj']['tokenid'] :false;

		if(tokenId){
			lib.dataRead('token',tokenId,(err,data)=>{
				if(!err && data){
					const tokenObj = {...parseJson(data)};
					const phone = tokenObj['phone'];
					tokenHandler._token.verify(tokenId,phone,(verify_token)=>{
							if(verify_token){
								lib.dataRead('users',phone,(err,data)=>{
									if(!err && data){
										const dataObj = {...parseJson(data)};
										const check = typeof dataObj['check'] === 'object' && Array.isArray(dataObj['check']) ? dataObj['check'] : [];
										if(check.length < env.staging.maxlen){
											let checkId = createToken(20);
											const checkObj = {
												protocal,
												checkId,
												url,
												inp_method,
												status,
												duration,
												phone


											}
											lib.create('check',checkId,checkObj,(err)=>{
												if(err === 'no error'){
													dataObj['check'] = check;
													dataObj['check'].push(checkId);
													lib.updateFile('users',phone,dataObj,(opt)=>{
														if( opt === 'fs close done'){
															callback(200,{
																checkObj
															})

														}else{
															callback(500,{
																message:'server error'
															})
														}
													})


												}else{
													callback(400,{
														message: 'Faild to create check file'
													})
												}

											})

										}else{
											callback(400,{
												message: "exceed limit"
											})
										}


									}else{
										callback(400,{
											message: "Please check user phone number"
										})
									}

								})
							}else{
								callback(400,{
									message :"token varify failed"
								})
							}
						})
				}else{
					callback(400,{
						message :"token mismatch"
					})
				}
			})
			

		}else{
			callback(400,{
				message :"Invalid token input"
			})
		}
	}else{
		callback(400,{
			message :"Invalid input"
		})
	}
}

//export
module.exports = handler;