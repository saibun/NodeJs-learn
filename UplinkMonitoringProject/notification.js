/*
* Title: Notification file,
* Description: notification control ,
* Author: Saikat Chatterjee,
* Date: 21-10-23
*/

//dependecies
const https = require ('https');
const env = require (`${__dirname}/enviorment.js`);
const qs = require('querystring')

//module scaffolding
const nft = {};

nft.notification = (phone, msg, callback)=>{

	const userphone = typeof(phone) === "string" && phone.length === 10 ? phone : false;

	const usermsg = typeof(msg) === "string" && msg.length > 2 && msg.length< 500 ? msg : false;

	if(userphone && usermsg){
		//create the request payload
	// 	const client = require('twilio')(accountSid, authToken);
	// 	client.messages.create({
	 //     body: usermsg,
	 //     from: env.staging.twilio.from,
	 //     to: `+91${userphone}`
   // }).then((message) => callback(message.sid));
		const payload = {
			from: env.staging.twilio.from,
			to: `+91${userphone}`,
			body: usermsg
		}

		
		

		

		const options = {
						  hostname: 'api.twilio.com',
						  method: 'POST',
						  path: `/2010-04-01/Accounts/${env.staging.twilio.accountSid}/Messages.json`,
						  auth: `${env.staging.twilio.accountSid}:${env.staging.twilio.authToken}`,
						  headers: {
						  	'Content-Type': 'application/x-www-form-urlencoded'
						  }
						};


		const req = https.request(options, (res) => {
  			if(res.statusCode === 200 || res.statusCode === 201 ){
  				callback(false);
  			}else{
  				callback(`res status code is ${res.statusCode}`);
  				
  			}
		})
		req.on('error', (e) => {
		  callback(e);
		});
		const stringify_payload = qs.stringify(payload);

		//we can't send request payload as a javascript object. we have to convert it into string. Here we use querystring.stringfy to convert the js obj. querystring.stringfy is similar link JSON.stringfy but there are some differences present
		//stringify is really slow, JSON. stringify is reasonably fast, and querystring. stringify (Node built-in) is an absolute winner (although it doesn't support "extended" querystring parameters, so it will only work with simple objects).
		req.write(stringify_payload);
		req.end();
		


	}else{
		callback(400,{
			err: 'Invalid phone or msg'
		})
	}



}

//model export
module.exports = nft;