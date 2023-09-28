/*
* Title: Data,
* Description: Handling read write data into file system,
* Author: Saikat Chatterjee,
* Date: 14-09-23
*/

//Dependencies
const path = require('path');
const fs = require('fs');

//Module Scuffolding
const lib = {};

//first we write where we have to store the write-file. Here we will store it into .data folder so we give that path by use path.join().The path.join() method joins the specified path segments into one path.You can specify as many path segments as you like.The specified path segments must be strings, separated by comma.
lib.createBasePath = path.join(__dirname,'/../.data/');

//create function to write data into file
lib.create = (dir,filename,data,callback)=>{
	//first step open the file to write. The fs.open() method takes a "flag" as the second argument, if the flag is "w" for "writing", the specified file is opened for writing. If the file does not exist, an empty file is created:
	fs.open(lib.createBasePath+dir+'/'+filename+'.json','wx',(err,fd)=>{
		//fd = fileDescriptor
		if(!err && fd){
			//convert the data into json
			//console.log(typeof data);
			const jsonData = JSON.stringify(data);
			//console.log(typeof jsonData);

			//write the file and close it
			fs.writeFile(fd,jsonData,(err)=>{
				//console.log(fd);
				if(!err){
					fs.close(fd,(err)=>{
						if(err){
							callback(err);
						}
						else{
							callback("no error");
						}
					});
				}else{
					callback(`Facing ${err} error in writeFile fn`);
				}

			})

		}else{
			callback(`Facing ${err}error in open fn`);
		}
	})
}

//Data read function
lib.dataRead = (dir,filename,callback)=>{
	fs.readFile(lib.createBasePath+dir+'/'+filename+'.json','utf8',(err,data)=>{
		callback(err,data);
		
	})
}


//Update a file
lib.updateFile = (dir,filename,data,callback)=>{
	fs.open(lib.createBasePath+dir+'/'+filename+'.json','r+',(err,fd)=>{
		if(!err && fd){
			const jsonData = JSON.stringify(data);

			//In the case of update first we have to erase the existing things to rewrite new. fs.ftruc() use in this case
			fs.ftruncate(fd,(err)=>{
				if(!err){
					fs.writeFile(fd,jsonData,(err)=>{
						if(!err){
						fs.close(fd,(err)=>{
							if(!err){
								callback("fs close done");
							}else{
								callback(`Facing ${err} error in close fn`);
							}
						});
				}else{
					callback(`Facing ${err} error in writeFile fn`);
				}
					})
				}else{
					callback(`Find ${err} -- error in trunc func`)
				}
			})
		}else{
			callback(`Find ${err} -- error in open func`);
		}

	});
}

//delete a file
lib.delete = (dir,filename,callback)=>{
	fs.unlink(lib.createBasePath+dir+'/'+filename+'.json',(err)=>{
		if(!err){
			callback('delete successfully');
		}else{
			callback('File does not exist');
		}
	});
}

//module export
module.exports = lib;
