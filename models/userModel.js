const mongoose = require("mongoose")



const userSchema= new mongoose.Schema({
    name :{
        type : String,
        required: true
    },
    email :{
        type : String,
        required:true
    },
    password : {
        type : String,
        required: true
    },
    followers:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    following :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    numFollowers:{
        type : Number,
        default : 0,
        min:0
    },
    numFollowing :{
        type : Number,
        default : 0,
        min :0
    }
},{
    timestamps : true
})


module.exports = new mongoose.model("User",userSchema)