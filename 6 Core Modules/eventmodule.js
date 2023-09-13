const EventEmitter = require('events');
const emitter = new EventEmitter();

//regiser a listener for bellring event
emitter.on("bellring",()=>{
	console.log("Open the door");
});
emitter.on("4pm",(game_name)=>{
	console.log(`play ${game_name}`);
});
emitter.on("hotel",({name,address})=>{
	//taking argument form object properties.
	console.log(`stay in ${name} at ${address} `);
});


//raise an event
emitter.emit("bellring");


setTimeout(()=>{
	//using setTimeout + passing argument.
	emitter.emit("4pm","cricket");
},2000);

//For passing multiple arguments use object format in emit
emitter.emit("hotel",{
	name: "Sunshine hotel",
	address: "kolkata"
})