const jwt = require("jsonwebtoken")
const userModel = require('../models/user.model')

async function authmiddleware(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access,Please login first"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        const user = await userModel.findOne({
            _id: decoded.id
        })
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }
       
        // return res.status(200).json({
        //     message: "Valid user",
        //     user: { id: user._id, username: user.username }
        // });
        
         // if user found saved data in user.req ,it can be anything chacha.req or anything
        req.user = user 
        next()

    } catch (error) {
        return res.status(401).json({
            message:"Invalid token ,Please login first"
        })
    }
}

module.exports = authmiddleware