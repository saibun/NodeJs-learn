const fs = require('fs');
//console.log(fs);

fs.writeFileSync("firstfile.txt","Hello! Saikat Chatterjee");
fs.writeFileSync("firstfile.txt","Wellcome to node.js learning tutorials. ");//it overlap the first text
fs.appendFileSync("firstfile.txt"," Hope you are well");

const readTextFile = fs.readFileSync("firstfile.txt");
console.log(readTextFile);//it will give the opt in buffer format.
console.log(readTextFile.toString());

//in upper section we use Sync with every method, here Sync mean synchronization way. Mean here all the work is doing by main thread. In Asynchronization main tread will trasfer the work to other thread in this case it give to i/o to do the job. Below given example.

fs.readFile("firstfile.txt",(err, data)=>{
	
	try{
		console.log(data.toString());
	}
	catch(err){
		console.log(err);
	}
})