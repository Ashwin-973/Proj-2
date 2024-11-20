const WebSocket=require('ws')
const http=require('http')

//Creating a http server
const server=http.createServer((req,res)=>
{
    res.setHeader('Access-control-allow-origins','*')
    res.setHeader('Access-control-allow-methods','*')
    res.setHeader('Access-control-allow-headers','*')
    switch(req.method)
    {
        case 'GET':
            res.write('yeah!!')
            console.log('successfully received a get request');
            return res.end()

        default:
            console.log(`the req didn't reach the server`) 
            
    }
    
}) 
//server listens on port 8080
server.listen('8080',()=>
{
    console.log(server.address())
})
//web socket server with a ws server  instance
const wss=new WebSocket.Server({server},(ws)=>
{
    console.log(`Client Object: ${ws}`)
})
wss.on('connection',()=>
{
    console.log(`A client connected to the web socket server named:${wss.clients()}`)
})
wss.on('error',()=>
{
    console.log('there was an error while connecting the client to wss')
})