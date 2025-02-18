//!separate this into server.js and app.js
const http=require('http')
const cookieParser=require('cookie-parser')
const express=require('express')
const app=express()
const userRoute=require("./routes/user")
const authRoute=require('./routes/authRoutes')
const {initializeServerSocket}=require('./sockets/socketServer')
const server=http.createServer(app)
server.listen(8080,()=>
{
    console.log(server.address())
})
app.use(cookieParser())
initializeServerSocket(server)
app.get('/',(req,res)=>
{
    res.send("welcome");
})
app.set('views',"C:\\Users\\Ashwi\\Documents\\Web Development\\WebDEV\\Proj2\\views")
app.set('view engine','ejs')
app.use(express.static("C:\\Users\\Ashwi\\Documents\\Web Development\\WebDEV\\Proj2\\public"))
app.use((req,res,next)=>
{
    res.setHeader('Cache-Control','no-cache')
    res.setHeader('Expires','0')
    next()
})
//**Route navigator: control directed to user.js under Router whenever the endpoint of the base url is /users
app.use('/users',userRoute)
app.use('/auth',authRoute)
//app.use(express.urlencoded({extended:true}))

