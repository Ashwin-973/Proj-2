const SocketIO=require('socket.io')
const http=require('http')
const express=require('express')
const app=express()
const userRoute=require("./routes/user")
const server=http.createServer(app)
server.listen(8080,()=>
{
    console.log(server.address())
})
app.get('/',(req,res)=>
{
    res.send("welcome");
})
app.set('views',"C:\\Users\\Ashwi\\Documents\\Web Development\\WebDEV\\Proj2\\views")
app.set('view engine','ejs')
app.use(express.static("C:\\Users\\Ashwi\\Documents\\Web Development\\WebDEV\\Proj2\\public"))
// why won't this work
app.use((req,res,next)=>
{
    res.setHeader('Cache-Control','no-cache')
    res.setHeader('Expires','0')
    next()
})
//Route navigator: control directed to user.js under Router whenever the endpoint of the base url is /users
app.use('/users',userRoute)
// app.use(express.urlencoded({extended:true}))


//web socket server with a ws server  instance for a particular client 
const SocketServer=new SocketIO.Server(server,
    {
        cors:{origin:'*'}
    })
SocketServer.on('connection',(socket)=>
{
    console.log(`A client connected to the web socket server with the id:${socket.id}`)
    SocketServer.emit('passingID',socket.id)
    socket.on('message',(msg)=>{
        console.log('message is:',msg)
        //broadcasts to all clients
        let messageObj={sessionID:socket.id,message:msg}
        SocketServer.emit('message',messageObj)
        messageObj={}
    })
    
})

