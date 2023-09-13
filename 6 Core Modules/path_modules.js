const path = require('path');//there no need to install this module by npm because it is core modules of js.
const myPath = '../Demo.js'; 
console.log(path.basename(myPath));
console.log(path.dirname(myPath));
console.log(path.extname(myPath));//return extention name.
console.log(path.parse(myPath));//return dir name, base name, extention name these kind of all information.
console.log(path.delimiter);
const obj = { root: '', dir: '..', base: 'Demo.js', ext: '.js', name: 'Demo' }
console.log("Format will  formats a path object into a path string. like--> "+ path.format(obj));
//the specifying the location of a file or directory from the root directory(/). 
console.log(path.isAbsolute(myPath));
//'..' will remove befor accuring segment.
let x1 = path.join('users','games','..','game.txt');
console.log(x1);
let x2 = path.join('users','games','game.txt');
console.log(x2);
