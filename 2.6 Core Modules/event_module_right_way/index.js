const School = require('./school.js');
const school = new School();

//register a listner
school.on("school end",(endTime)=>{
	console.log(`school end at ${endTime}. GO home and Play`);

});

school.period();