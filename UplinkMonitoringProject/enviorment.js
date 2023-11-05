/*
* Title: enviorment,
* Description: Handling verious enviorment
* Author: Saikat Chatterjee,
* Date: 13-10-23
*/

//module scaffolding
const env = {};

//staging
env.staging = {
	maxlen: 5,
	twilio: {
		from: '+15017122661',
		accountSid: 'AC6dae881a29e6ac6800e162eca36cd665',
		authToken: '467efe53ae3e4a3e327aa43aeebf54e1',
	},
}

//production
env.production = {
	maxlen: 5
}

//module export
module.exports = env;