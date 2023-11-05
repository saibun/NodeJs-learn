/*
* Title: Utilities,
* Description: Store all utilities function which help in code,
* Author: Saikat Chatterjee,
* Date: 24-09-23
*/

//dependecies
const crypto = require('crypto');//for encoding user passowrd

//module scaffolding
const utilities = {};


//conveting into js object data
utilities.parseJson = (jsonString)=>{
	let output;
	try{
		output = JSON.parse(jsonString);
	}catch{
		output={};
	}
	return output;
}
//encoding

utilities.hash = (str)=>{
	if(typeof(str)==='string' && str.length > 0){
		const hash = crypto.createHmac('sha256', 'abcdefg')
        					.update(str)
        					.digest('hex');
        return hash;
	}else{
		console.log('encryption failed');
	}
	
}
utilities.createToken = (str_length)=>{
	//let save the length
	//check validation(check type) and then save the length
	let ln = typeof(str_length) === 'number' && str_length >0 ? str_length: false;
	let possibleChar = "abcdefghijklmnopqrstABCDEFGHIJKLMNOP123456789";
		let output = "";
	if(ln){
		//generate random token
		if(possibleChar.length>=ln){
			while(output.length < ln){
				let randomPos = Math.floor(Math.random()*possibleChar.length);
				output+=possibleChar[randomPos];
			}
		}else{
			console.log("requirment can't procced")
		}
		return output;
	}else{
		return false;
	}

		
	
}


//exports
module.exports=utilities;