/*
*Title: meems generator,
*Description: Arranging meems in a right maner,
*Author: Saikat Chatterjee,
*Date: 13-09-23
*/

//Dependencies
const fs = require('fs');

//meems object - Module scaffolding
const meems = {};

//Get all the meems 

meems.getAllMeems = function getAllMeems(){
	const readMeem = fs.readFileSync(`${__dirname}/meems.txt`,'utf8');
	const arr = readMeem.split(/\r?\n/);
	return arr;
}

//export library
module.exports = meems;

