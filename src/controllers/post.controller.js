// const postModel = require("../models/post.model");
const  generateCaption = require('../services/ai.services')

async function createPostController(req,res){
    const file = req.file
    
    // converting base64 to normal image
    const buffer64Image = Buffer.from(file.buffer).toString('base64')

    const caption = await generateCaption(buffer64Image)
    console.log(caption);

    res.json({
        caption
    })
    
    
}

module.exports = { createPostController };