/*
* Title: 	Random Number Generator.
* Description: Creating a random number between a range.
* Author: 	Saikat Chatterjee.
* Date: 	13-09-23
*/


//math object - module scaffolding
const math = {};

//get a random number between two integer.
math.getRandomNumber = function getRandomNumber(min,max){
	let minimum = typeof min === 'number' ? min : 0;
	let maximum = typeof max === 'number' ? max : 0;
	let randomNum = Math.floor(Math.random() * (maximum - minimum) + minimum);
	return randomNum;
};

//export library
module.exports = math;



