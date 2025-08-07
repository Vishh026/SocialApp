const express = require('express')
const authmiddleware = require('../Middlewares/auth.middleware')
const multer = require('multer')
const {createPostController} = require('../controllers/post.controller')
const router = express.Router()

const upload = multer({storage: multer.memoryStorage()})

router.post(
    "/",
    authmiddleware, /* userdata set in = user.req */
    upload.single("image"),
    createPostController
)


module.exports = router