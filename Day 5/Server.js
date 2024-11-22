const Websocket=require('ws')
const http=require('http')

//Creating a http server
const server=http.createServer((req,res)=>
{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','*')
    res.setHeader('Access-Control-Allow-Headers','*')
    if(req.method==='OPTIONS')
    {
        res.setHeader('Access-Control-Allow-Origin','*')
        res.setHeader('Access-Control-Allow-Methods','GET,OPTIONS')
        res.setHeader('Access-Control-Allow-Headers','Content-type,text')  
        res.end()
    }
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
server.listen(8080,()=>
{
    console.log(server.address())
})
//web socket server with a ws server  instance
const wss=new Websocket.Server({server})
wss.on('connection',(ws)=>
{
    console.log(`Client Object: ${ws.toString()}`)
    console.log(`A client connected to the web socket server named:${wss.clients.toString()}`)
    ws.on('message',(msg)=>{
        console.log('message is:',msg.toString())
    })
    ws.on('error',()=>
    {
        console.log('error')
    })
})
wss.on('error',()=>
{
    console.log('there was an error while connecting the client to wss')
})

