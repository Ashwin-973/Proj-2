const ws=require('ws')
const http=require('http')

//Creating a http server
const server=http.createServer((req,res),()=>
{
    res.write('hello')
    console.log('sever created')
}) 
//server listens on port 8080
server.listen('8080',()=>
{
    console.log(server.address())
})