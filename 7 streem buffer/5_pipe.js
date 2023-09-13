const fs = require('fs');

let readStream = fs.createReadStream(`${__dirname}/bigdata.txt`);

let writeStream = fs.createWriteStream(`${__dirname}/pipebigdata.txt`);

readStream.pipe(writeStream);