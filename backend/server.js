const app= require('./app')
const connectWithDb= require('./config/database')
const cloudinary=require('cloudinary')
const nodeCron= require('node-cron')
const Stats = require('./models/Stats')

connectWithDb()


cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

nodeCron.schedule("0 0 0 1 * *",async()=>{
    try {
           await Stats.create({})        
    } 
    catch (error) {
     console.log(error);
  
    }
})





app.listen(process.env.PORT,()=>{
    console.log(`Server listening on ${process.env.PORT}`)
})

