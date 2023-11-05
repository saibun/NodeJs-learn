const express = require("express");
const app = express();

/**
 * Using express.static() we can access specific mention folder and show the data through url
 * Here we access text and image folder , show present data into those folder by making public the parent folder as static.
 * To access we have write the path of specific folder comming under static folder which we made. Here --> localhost:3000/text/text.txt    or   localhost:3000/images/Hanuman.jpg
 */
app.use(express.static(`${__dirname}/public/`,{index: 'Ma_Baba.jpg'}));
/**
 * With the path name we also send a objcet into which index properties valu is a data. The reson behind it if user just hit the image folder but not mention any specific data which want to see in that case Ma_Baba.jpg image will be show. Meaning this is use to show a defult data if user not mention any particular data form the particular folder.
 * User hit the url like this way --> localhost:3000/images
 */

app.listen(3000,()=>{ console.log("3000 server running...")});