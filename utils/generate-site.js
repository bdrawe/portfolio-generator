const { fips } = require("crypto");
const fs = require("fs");

const writeFile =  fileContent => {
    return new Promise((resolve, reject) =>{
        fs.writeFile('./dist/index.html', fileContent, err =>{
            //if there is an error reject the promise and send the error to the promise's catch() method
            if (err) {
                reject(err)
                return;
            }
            resolve({
                ok: true,
                message:'File Created!'
            });
        });
    });
};
const copyFile = () => {
    return new Promise((resolve, reject) =>{
        fs.copyFile('./src/style.css', './dist/style.css', err =>{
            if(err){
                reject(err)
                return;
            }
            resolve({
                ok: true, 
                message: 'CSS Copied'
            });
        });
    });
}
module.exports = {writeFile, copyFile};