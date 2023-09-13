import generateName from "sillyName";
//var generateName = require('sillyname');
var sillyName = generateName();
console.log(`My name is ${sillyName}`);

import superheroes from "superheroes";
//console.log(superheroes.all);
//=> ['3-D Man', 'A-Bomb', …]
//const superheroes = require('superheroes');
var superheroes_name = superheroes.random();
console.log(`Superhero name is ${superheroes_name}`);
