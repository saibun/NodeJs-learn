const fs = require('fs');

let readStream = fs.createReadStream(`${__dirname}/bigdata.txt`)
let writeStream = fs.createWriteStream(`${__dirname}/newbigdata.txt`);

readStream.on('data',(data)=>{
	writeStream.write(data);
});