var ImageKit = require("imagekit");
require("dotenv").config()

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY, 
    privateKey :  process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint :  process.env.IMAGEKIT_URLENDPOINT,
});


async function uploadFile(file,fileName){
    const response = await imagekit.upload({
        file:file,
        fileName:fileName,
        folder: "/Social_App"
    })
    return response
}

module.exports = uploadFile