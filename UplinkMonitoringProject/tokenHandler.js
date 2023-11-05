/*
* Title: Toke Handler,
* Description: Token Handler for authentication,
* Author: Saikat Chatterjee,
* Date: 05-10-23
*/

//Dependencies
const lib = require('./lib/data.js');
const {hash} = require('./utilities.js');
const {parseJson} = require('./utilities.js');
const {createToken} = require('./utilities.js');

//Module scaffolding
const handler = {};

//sampleHandler Function
handler.tokenHandler = (requestProperties,callback)=>{
	const acceptMethods = ['get','post','put','delete'];
	if(acceptMethods.includes(requestProperties.method)){
		handler._token[requestProperties.method](requestProperties,callback);
	}else{
		callback(405,{
			message: 'Invalid method',
		});
	}
	
}
//scaffolding for handling methods
handler._token={};


handler._token.get = (requestProperties,callback)=>{
	const tokenId = typeof (requestProperties['queryStringObj']['id']) === 'string' && requestProperties['queryStringObj']['id'].trim().length === 20 ? requestProperties['queryStringObj']['id'] : false;
	if(tokenId){
		lib.dataRead('token',tokenId,(err,data)=>{
				if(!err && data){
					const obj = {...parseJson(data)};
					callback(200,obj);

				
				}else{
					callback(500,{err: 'Token mismatch' });
				}
		})
	}else{
		callback(404,{
			message:'Invalid token'
		})
	}
}



handler._token.post = (requestProperties,callback)=>{
	const phone = typeof (requestProperties['postBody']['phone']) === 'string' && requestProperties['postBody']['phone'].trim().length === 10 ? requestProperties['postBody']['phone'] : false;

	const password = typeof (requestProperties['postBody']['password']) === 'string' && requestProperties['postBody']['password'].trim().length > 0 ? requestProperties['postBody']['password'] : false;

	if(phone && password){
		//check correct password or not from the files
		lib.dataRead('users',phone,(err1,data)=>{
			//encrypt given password first
			const hashPassword = hash(password); 
			const obj = {...parseJson(data)};
			if(hashPassword === obj.password){
				//generate tokenid
				const tokenId = createToken(20);
				const expire = Date.now()+ 60*60*1000;
				const tokenObj={
					phone,
					tokenId,
					expire
				}
				lib.create('token',tokenId,tokenObj,(opt)=>{
					if(opt === 'no error'){
						callback(200,tokenObj)
					}else{
						callback(500,{
							message:'Token file creation failed'
						});
					}
				})
			}else{
				callback(500,{
					message:'password incorrect'
				})
			}
		})
	}else{
		callback(400,{
			message:'toke invalid'
		})
	}
	
}



handler._token.put = (requestProperties,callback)=>{
	const tokenId = typeof (requestProperties['postBody']['tokenId']) === 'string' && requestProperties['postBody']['tokenId'].trim().length === 20 ? requestProperties['postBody']['tokenId'] : false;
	const extend = typeof (requestProperties['postBody']['extend']) === 'boolean' && requestProperties['postBody']['extend'] === true ? requestProperties['postBody']['extend'] : false;
	if(tokenId && extend){
		lib.dataRead('token',tokenId,(err,data)=>{
			if(!err && data){
				//increament time
				let obj = {...parseJson(data)};
				if(obj.expire > Date.now()){
					obj.expire += Date.now()+ 60 * 60 * 1000;
					lib.updateFile('token',tokenId,obj,()=>{
							callback(200,obj);
						});
				}else{
					callback(440,{
						message:'login timeout'
					})
				}
				

			}else{
				callback(500,{
					message:'token mismatch'
				})
			}
		})
	}else{
		callback(400,{
			message: 'Invalid input'
		})
	}

}


handler._token.delete = (requestProperties,callback)=>{
	const tokenId = typeof requestProperties['queryStringObj']['id'] === 'string' && requestProperties['queryStringObj']['id'].length === 20 ? requestProperties['queryStringObj']['id']:false;

	if(tokenId){
		lib.dataRead('token',tokenId,(err,data)=>{
			if(!err && data){
				lib.delete('token',tokenId,(result)=>{
					if(result ==="delete done"){
						callback(200,{
					 		message:'Token successfully deleted!'
					 	});
					}else{
						callback(500,{
					 		message:'There is a server problem'
					 	});
					}
				 	
				 });

			}else{
				callback(404,{
					message: 'Token Not Found'
				});
			}
		})

	}else{
		callback(400,{
			message: 'Invalid request'
		});
	}
	
}

handler._token.verify = (tokenId,phone,callback)=>{
	lib.dataRead('token',tokenId,(err,data)=>{
		if(!err && data){
			const clone_data_obj = {...parseJson(data)};
			if(clone_data_obj.phone === phone && clone_data_obj.expire > Date.now()){
					callback(true);
			}else{
				callback(false);
			}
		}else{
			callback(false);
		}
	})
}

//export
module.exports = handler;