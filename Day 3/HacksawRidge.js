
//opening chatbox on the click of every username
let usersNodeList = document.querySelectorAll(".chat-list")
let users = Array.from(usersNodeList)
console.log(users)
let popUp=document.getElementById('right-nav')
const exeOnClick= (u) => {
  u.addEventListener("click", () =>
  {
    console.log("Clicked")
    if(popUp.style.display==='none')
    {
      popUp.style.display='flex'
    }
    else
    { 
      popUp.style.display='none'
    }
  })
}
users.forEach(exeOnClick)
//instatiating a websocket connection between browser API and server side web socket
const websocket=new WebSocket('http:/localhost/8080/')
websocket.on('error',()=>
{
  console.log('there was an error from the client-side')
})

fetch('http:/localhost/8080/',{method:'GET',mode:'cors',headers:{'Content-type':'text'}})
.then((msg)=>
{
  console.log('GET request got a response')
  console.log('it was: ',msg)
  
})
.catch(()=>
{
  console.log('there was an error durin res')
})