const SocketIO=require('socket.io')
const http=require('http')
const express=require('express')
const app=express()
const userRoute=require('./Routes/user')
//Creating a http server & handling req methods
const server=http.createServer(app)
//server listens on port 8080
server.listen(8080,()=>
{
    console.log(server.address())
})
app.get('/',(req,res)=>
{
    res.send("welcome");
})
app.set('view engine','ejs')
// app.set('views',path.join(__dirname,'Day 24','Views'))
app.set('views',"C:\\Users\\Ashwi\\Documents\\Web Development\\WebDEV\\Proj2\\Day 28\\Views")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//Route navigator: control directed to user.js under Router whenever the endpoint of the base url is /users
app.use('/users',userRoute)
app.use(express.static('public'))




















//web socket server with a ws server  instance for a particular client 
const SocketServer=new SocketIO.Server(server,
    {
        cors:{origin:'*'}
    }
)
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

