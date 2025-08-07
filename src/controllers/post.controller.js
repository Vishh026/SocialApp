const postModel = require("../models/post.model");
const generateCaption = require('../services/ai.services');
const uploadFile = require('../services/storage.services');
const { v4: uuidv4 } = require('uuid');

async function createPostController(req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated." });
    }

    // Convert image buffer to base64 for caption generation
    const buffer64Image = Buffer.from(file.buffer).toString('base64');

    const caption = await generateCaption(buffer64Image);
    const result = await uploadFile(file.buffer, `${uuidv4()}`);

    console.log("Caption:", caption);
    console.log("Image URL:", result?.url);

    const post = await postModel.create({
      caption,
      image: result.url,
      user: req.user._id
    });

    return res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (err) {
    console.error("Error in createPostController:", err.message);
    console.error("Stack trace:", err.stack);
    return res.status(500).json({
      error: err.message || "Internal server error"
    });
  }
}

module.exports = { createPostController };
