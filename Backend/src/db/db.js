const mongoose = require('mongoose')

const connectToDB = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=> {
        console.log("database connected successfully");   
    })
    .catch((err)=> {
        console.log(err,"Error in connecting database"); 
    })
}

module.exports = connectToDB