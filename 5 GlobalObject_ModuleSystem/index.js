//First chapter


/*In browser window object is present. we using lot of methods comming under
window object like setTimeout(), alert(), prompt(), print(), onclick().

But in node window object is not present but a equivalent object is present
which name is "global" . It also hold some functions ,not so many func like window obj but some are there. To know how many and which function are present into "global" object we did console.log in below*/
console.log(global);

//set time out function is also available under global obj so we can use it in node.js
setTimeout(()=>{
	console.log("Learning Node is awsome");
},3000);


//normally when we work with browser, we know if we assign a variable with var keyword it will show into window obj if we do console.log(window)
//But in node similar things not happen variable will not show into global
var a =100;
console.log(a);
console.log(global.a);//it's output will be undefiend
console.log(__dirname);
console.log(__filename);

//In this directory "NormalJs" folder present where you can see two different js files are linked with html page and a variable which define in one js file can use in another js file because of the variable save into window obj.

//In node.js module is each seperated js files. in node.js every js files are not conncect with each other unless we import it

const fromDemo =require("./demo.js");//to import any node.js file.
console.log(fromDemo.cars);
console.log(fromDemo.name);
console.log(fromDemo.message);//it will show the function definitation
fromDemo.message();




