const SocketIO=require('socket.io')
const http=require('http')
//Creating a http server & handling req methods
const server=http.createServer()
//server listens on port 8080
server.listen(8080,()=>
{
    console.log(server.address())
})
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
