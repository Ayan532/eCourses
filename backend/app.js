const express= require('express')
require('dotenv').config({ path: './config/config.env' })
const ErrorMiddleware= require('./middlware/ErrorMiddleware')
const cookieParser= require('cookie-parser')
const cors=require('cors')
const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:['GET', 'POST','PUT','DELETE']
    
}))






//All Routes Import
const user=require('./routes/user')
const course=require('./routes/course')
const plan=require('./routes/plan')
const others=require('./routes/other')



//All Routes
app.use('/api/v1/users',user)
app.use('/api/v1/courses',course)
app.use('/api/v1/plan',plan)
app.use('/api/v1',others)


module.exports=app

app.get("/",(req,res)=>res.send(`<h1>Server is Running.Click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend/h1>`))


app.use(ErrorMiddleware)