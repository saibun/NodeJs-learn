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
const hash = 

//exports
module.exports=utilities;