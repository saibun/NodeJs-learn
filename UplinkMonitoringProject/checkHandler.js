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

//In get method we fetch the check file by given checkid
handler._check.get = (requestProperties,callback)=>{
	const checkid = typeof requestProperties['queryStringObj']['id'] === 'string' && requestProperties['queryStringObj']['id'].trim().length === 20 ? requestProperties['queryStringObj']['id'] : false;
	if(checkid){
		const tokenid = typeof requestProperties['headerObj']['tokenid'] === 'string' && requestProperties['headerObj']['tokenid'].length === 20 ? requestProperties['headerObj']['tokenid'] :false;
		if(tokenid){
			lib.dataRead('check',checkid,(err,data)=>{
				if(!err && data){
					const checkobj = {...parseJson(data)};
					tokenHandler._token.verify(tokenid,checkobj['phone'],(verify_token)=>{
						if(verify_token){
							callback(200, checkobj)

						}else{
							callback(400,{
								message: " token verification failed"
							})
						}

					})

				}else{
					callback(400,{
						message: "File not found"
					})
				}
			})

		}else{
			callback(400,{
				message:"Invalid token"
			})
		}

	}else{
		callback(400,{
			message: "Invalid checkid"
		})
	}
}

//In put method we update check file monitoring through checkid
handler._check.put = (requestProperties,callback)=>{
	//Id verification first
	const checkid = typeof requestProperties['postBody']['id'] === 'string' && requestProperties['postBody']['id'].trim().length === 20 ? requestProperties['postBody']['id'] : false;

	//update properties --->
	const protocal = typeof requestProperties['postBody']['protocal'] === 'string' && ['http','https'].includes(requestProperties['postBody']['protocal']) ? requestProperties['postBody']['protocal'] : false;

	const url = typeof requestProperties['postBody']['url'] === 'string' && requestProperties['postBody']['url'].length > 1  ? requestProperties['postBody']['url'] : false;


	const inp_method = typeof requestProperties['postBody']['method'] === 'string' && ['get','put','post','delete'].includes(requestProperties['postBody']['method']) ? requestProperties['postBody']['method'] : false;

	const status = typeof requestProperties['postBody']['status'] === 'object' && Array.isArray(requestProperties['postBody']['status']) ? requestProperties['postBody']['status'] : false;

	const duration = typeof requestProperties['postBody']['time'] === 'number' && requestProperties['postBody']['time']>= 1 && requestProperties['postBody']['time'] <= 5 ? requestProperties['postBody']['time']:false;

	if(checkid){
		if(protocal || url || inp_method || status || duration){
			lib.dataRead('check',checkid,(err,data)=>{
				const checkobj = {...parseJson(data)};
				if(!err && data){
					const tokenid = typeof requestProperties['headerObj']['tokenid'] === 'string' && requestProperties['headerObj']['tokenid'].length === 20 ? requestProperties['headerObj']['tokenid'] :false;
					if(tokenid){
						tokenHandler._token.verify(tokenid,checkobj['phone'],(verify_token)=>{
							if(verify_token){
								if(protocal){
									checkobj.protocal = protocal;
								}
								if(url){
									checkobj.url = url;
								}
								if(inp_method){
									checkobj.inp_method = inp_method;
								}
								if(status){
									checkobj.status = status;
								}
								if(duration){
									checkobj.duration = duration;
								}
								lib.updateFile('check',checkid,checkobj,(opt)=>{
									if(opt === 'fs close done'){
										callback(200,{
												message: "update done."
											})
									}else{
										callback(400,{
											message: "failed to update file"
										})
									}
								})

							}else{
								callback(400,{
									message: "toke verification failed"
								})
							}

						})

					}else{
						callback(400,{
							message: "Invalid token"
						})
					}


				}else{
					callback(400,{
						message: "id mismatch"
					})
				}
			})
		}else{
			callback(400,{
				message: "minimum one property required"
			})
		}
	}else{
		callback(400,{
			message: "Invalid Id"
		})
	}

}

handler._check.delete = (requestProperties,callback)=>{
	//verify and sorted the passed checkdid through query string
	const checkid = typeof requestProperties['queryStringObj']['id'] === 'string' && requestProperties['queryStringObj']['id'].trim().length === 20 ? requestProperties['queryStringObj']['id'] : false;
	if(checkid){
		const tokenid = typeof requestProperties['headerObj']['tokenid'] === 'string' && requestProperties['headerObj']['tokenid'].length === 20 ? requestProperties['headerObj']['tokenid'] :false;
		if(tokenid){
			lib.dataRead('check',checkid,(err,data)=>{
				if(!err && data){
					const checkobj = {...parseJson(data)};
					const phone = checkobj['phone'];
					tokenHandler._token.verify(tokenid,phone,(verify_token)=>{
						if(verify_token){
							lib.delete('check',checkid,(opt)=>{
								if(opt === "delete done"){
									lib.dataRead('users',phone,(err,data)=>{
										if(!err && data){
											const userobj = {...parseJson(data)};
											const checkArray = typeof userobj['check'] === 'object' && Array.isArray(userobj['check']) ? userobj['check'] : [] ;
											if(checkArray.length > 0 ){
												const pos = checkArray.indexOf(checkid);
												if(pos > -1) {
													checkArray.splice(pos,1);
													userobj['check'] = checkArray;
													lib.updateFile('users',phone,userobj,(opt)=>{
														if(opt === 'fs close done'){
															callback(200,{
																message:'link delete successfully'
															})
														}else{
															callback(400,{
																message:'Failed to delete link'
															})
														}
													})


												}else{
													callback(400,{
														message: 'Invalid position'
													})
												}

											}else{
												callback(400,{
													message: 'No checkid present'
												})
											}


										}else{
											callback(500,{
												message: 'Server error'
											})
										}
									})

								}else{
									callback(400,{
										message: 'Delete failed'
									})
								}
							})
							

						}else{
							callback(400,{
								message: " token verification failed"
							})
						}

					})

				}else{
					callback(400,{
						message: "File not found"
					})
				}
			})

		}else{
			callback(400,{
				message:"Invalid token"
			})
		}

	}else{
		callback(400,{
			message: "Invalid checkid"
		})
	}

}


//export
module.exports = handler;