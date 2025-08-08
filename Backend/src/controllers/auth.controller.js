const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

async function registerController(req,res){
    const {username,password} = req.body

    const isUserAlredyExists = await userModel.findOne({
        username
    })
    if(  isUserAlredyExists){
        return res.status(400).json({message:"User alredy exist"})
    }

    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password,10)
    })

    const token = jwt.sign({id:user._id},process.env.SECRET_KEY)

    res.cookie("token",token)

    return res.status(201).json({
    message: "User Created Successfully",
    user: {
        id: user._id,
        username: user.username
    }
});
}

async function loginController(req,res){
    const {username,password} = req.body

    const user = await userModel.findOne({username})

    if(!user){
        return res.status(400).json({message:"User Not Found"})
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid Password"})
    }

    const token = jwt.sign({id:user._id},process.env.SECRET_KEY)
    res.cookie("token",token)

    return res.status(200).json({
        message:"user Login Successfully",
        user: {
            username:user.username,
            id:user._id
        }
    })
}

module.exports = {
    registerController,
    loginController
}