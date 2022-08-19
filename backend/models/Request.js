const mongoose=require('mongoose')

const schema=new mongoose.Schema({
   
    name:{
        type:String,
        required:[true,'Please enter a name'],
    },
    email:{
        type:String,
        required:[true,'Please enter a Email'],
    },
    title:{
            type:String,
            required:[true,'Please enter a lectures title'],
        },
        description:{
            type:String,
            required:[true,'Please enter a lectures description'],
        },
    createdAt:{
        type:Date,
        default:Date.now()
    }




})

module.exports=mongoose.model('RequestCourses', schema)