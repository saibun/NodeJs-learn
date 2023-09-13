const cars=["toyota supra","lamborgini","ferari"];
let name="saikat";
function message(){
	console.log("hello bro !");
}
//message();
console.log(module);
//module.exports=cars;
//unless give access by using module.exports one node.js file can't use variables and functions of other node.js files
//when we need to exports multiple things we can export like
//what i want to export: in which name i want to export
module.exports = {
	cars,name,message
};