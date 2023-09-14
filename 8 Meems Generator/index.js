/*
* Title: 		Meems generator.
* Description: 	Creating a random meems every time.
* Author: 		Saikat Chatterjee.
* Date: 		13-09-23
*/


//Dependencies
const mathLib = require(`${__dirname}/randomNumGen.js`);
const meemLib = require(`${__dirname}/meemsFile.js`)

//app object - Module scaffolding
const app = {};

//generating a random meems
app.showMeem = function showMeem(){

	//get the array of meems.
	let allMeems = meemLib.getAllMeems();

	let meemLn = allMeems.length;
	
	//get the generated random number.
	let randomNum = mathLib.getRandomNumber(1,meemLn);
	
	let printMeem = allMeems[randomNum - 1];

	console.log(printMeem);

}

//call showMeem
app.showMeem();

