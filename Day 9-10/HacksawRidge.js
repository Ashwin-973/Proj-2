
// import { io } from 'socket.io-client';
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

const ioF= io('ws://localhost:8080')



    console.log('connection open')

    function sendMessage(e)
    {
      e.preventDefault()
      const messageBox=document.getElementById('messageBox')
      let hostMsg=document.getElementById('messageBox').value
      if(hostMsg)
      {
        ioF.emit('message',hostMsg)
        document.getElementById('messageBox').value=''
      }
      // websocket.send(hostMsg)
      messageBox.focus()
    }
    document.getElementById('send').addEventListener('click',sendMessage)

    //Rendering chats on the page
    ioF.on('message', (data)=>
      {
        console.log(data)
        let chatBubble=document.createElement('p')
        chatBubble.textContent= data
        document.getElementById('right-nav').appendChild(chatBubble)
      })
        
    

ioF.on('error',(e)=>
{
    console.log('there was an error from the client-side: ',e)
})









/*fetch('http://localhost:8080',{method:'POST',mode:'cors'})
.then((msg)=>
{
  console.log('POST request got a response')
  console.log('it was: ',msg)
   
})
.catch(()=>
{
  console.log('there was an error durin res')
})*/