/*
* Title: userHandler,
* Description: User Handler handle all kind of request via user route,
* Author: Saikat Chatterjee,
* Date: 24-09-23
*/

//Dependencies
const lib = require('./lib/data.js');
const {hash} = require('./utilities.js');
const {parseJson} = require('./utilities.js');


//Module scaffolding
const handler = {};

//sampleHandler Function
handler.userHandler = (requestProperties,callback)=>{
	const acceptMethods = ['get','post','put','delete'];
	if(acceptMethods.includes(requestProperties.method)){
		handler._user[requestProperties.method](requestProperties,callback);
	}else{
		callback(405,{
			message: 'Invalid method',
		});
	}
	
}
//scaffolding for handling methods
handler._user={};

//@TODO: Authentication
handler._user.get = (requestProperties,callback)=>{
	//check query string is phone or not.
	const phone = typeof (requestProperties['queryStringObj']['phone']) === 'string' && requestProperties['queryStringObj']['phone'].trim().length === 10 ? requestProperties['queryStringObj']['phone'] : false;
	if(phone){
		//will read the file
		lib.dataRead('users',phone,(err,data)=>{
				if(!err && data){
					const obj = {...parseJson(data)};
					delete obj.password;
					callback(200,obj);

				
				}else{
					callback(404,{err: 'Not Found' });
				}
		})
	}else{
		callback(404,{
			message:'User not found'
		})
	}

	
}
handler._user.post = (requestProperties,callback)=>{
	const firstName = typeof (requestProperties['postBody']['firstname']) === 'string' && requestProperties['postBody']['firstname'].trim().length > 0 ? requestProperties['postBody']['firstname'] : false;

	const lastName = typeof (requestProperties['postBody']['lastname']) === 'string' && requestProperties['postBody']['lastname'].trim().length > 0 ? requestProperties['postBody']['lastname'] : false;

	const phone = typeof (requestProperties['postBody']['phone']) === 'string' && requestProperties['postBody']['phone'].trim().length === 10 ? requestProperties['postBody']['phone'] : false;

	const password = typeof (requestProperties['postBody']['password']) === 'string' && requestProperties['postBody']['password'].trim().length > 0 ? requestProperties['postBody']['password'] : false;

	const term_Condtion = typeof (requestProperties['postBody']['term_condition']) === 'string' && requestProperties['postBody']['term_condition'].trim().length > 0 ? requestProperties['postBody']['term_condition'] : false;
	if(firstName && lastName && phone && term_Condtion && password){
		//first check korbo age entry hoye ache naki jodi na thake ta hole entry kore nebo
		lib.dataRead('users',phone,(err1,data)=>{
			if(err1 && !data){
				const userObj = {
									firstName,
									lastName,
									phone,
									term_Condtion,
									password: hash(password)
								}
				lib.create('users',phone,userObj,(err2)=>{
					if(err2=="no error"){
						callback(200,{
							message:'User is created successfully'
						});
					}else{
						callback(500,{
							message:'Failed to create user'
						});
					}
				});


			}else{
				callback(500,{
					error: "There is a problem in server side"
				})
			}
		});
		
		

	}else{
		
		callback(400,{
			error: 'User Input invalid',
		});
	}



	
}
//@TODO: Authentication
handler._user.put = (requestProperties,callback)=>{
	const firstName = typeof (requestProperties['postBody']['firstname']) === 'string' && requestProperties['postBody']['firstname'].trim().length > 0 ? requestProperties['postBody']['firstname'] : false;

	const lastName = typeof (requestProperties['postBody']['lastname']) === 'string' && requestProperties['postBody']['lastname'].trim().length > 0 ? requestProperties['postBody']['lastname'] : false;

	const phone = typeof (requestProperties['postBody']['phone']) === 'string' && requestProperties['postBody']['phone'].trim().length === 10 ? requestProperties['postBody']['phone'] : false;

	const password = typeof (requestProperties['postBody']['password']) === 'string' && requestProperties['postBody']['password'].trim().length > 0 ? requestProperties['postBody']['password'] : false;

	const term_Condtion = typeof (requestProperties['postBody']['term_condition']) === 'string' && requestProperties['postBody']['term_condition'].trim().length > 0 ? requestProperties['postBody']['term_condition'] : false;

	if(phone){
		/*for update whole things--
		const updateObj = {
			firstName,
			lastName,
			phone,
			password: hash(password),
			term_Condtion
		}
		lib.updateFile('users',phone,updateObj,(opt)=>{
			if(opt === 'fs close done'){
				const showUpdateObj = {...updateObj};
				delete showUpdateObj['password'];
				callback(200,{
					update_result: showUpdateObj
				})
			}else{
				callback(500,{
					message:'Internal server error'
				})
			}
		})
		*/
		if(firstName || lastName || password || term_Condtion){
			lib.dataRead('users',phone,(err,data)=>{
				const updatData = {...parseJson(data)};
				if(!err && updatData){
					if(firstName){
						updatData.firstName = firstName;
					}
					if(lastName){
						updatData.lastName = lastName;
					}
					if(password){
						updatData.password = hash(password);
					}
					if(term_Condtion){
						updatData.term_Condtion = term_Condtion;
					}
					lib.updateFile('users',phone,updatData,(opt)=>{
						callback(200,{
							message: 'File update successfully'
						})
					})




				}
			})
		}else{
			callback(404,{
				message: 'Not Found',
			});

		}

	}else{
		callback(404,{
			message: 'Not Found',
		});
	}

	
}

//@TODO: Authentication
handler._user.delete = (requestProperties,callback)=>{
	const phone = typeof requestProperties['queryStringObj']['phone'] === 'string' && requestProperties['queryStringObj']['phone'].length === 10 ? requestProperties['queryStringObj']['phone']:false;

	if(phone){
		lib.dataRead('users',phone,(err,data)=>{
			if(!err && data){
				lib.delete('users',phone,(result)=>{
					console.log("this is delete method result = "+result);
					console.log(typeof result);
					if(result ==="delete done"){
						callback(200,{
					 		message:'User successfully deleted!'
					 	});
					}else{
						callback(500,{
					 		message:'There is a server problem'
					 	});
					}
				 	
				 });

			}else{
				callback(404,{
					message: 'Not Found'
				});
			}
		})

	}else{
		callback(400,{
			message: 'Invalid request'
		});
	}
	
}

//export
module.exports = handler;