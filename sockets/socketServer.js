const SocketIO=require('socket.io')
const {socketConnectAuth}=require('../middleware/authMiddleware')
function initializeServerSocket(server)
{
    const io=new SocketIO.Server(server,
        {
            cors:{origin:'*'}
        })
        io.use(socketConnectAuth)
        io.on('connection',(socket)=>
            {
                console.log(`A Client Connected With Id:${socket.id}`)
                io.emit('passingID',socket.id)
                socket.on('message',(msg)=>{
                console.log('message is:',msg)
                //broadcasts to all clients
                let messageObj={sessionID:socket.id,message:msg}
                io.emit('message',messageObj)
                messageObj={}
            })
        })
}
module.exports={initializeServerSocket,}