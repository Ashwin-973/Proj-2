let currentClient
//opening chatbox on the click of every username
let usersNodeList = document.querySelectorAll(".chat-list");
let users = Array.from(usersNodeList);
console.log(users);
let chatNames=[]
users.forEach((i)=>
{
  chatNames.push(i.textContent);
})
console.log(chatNames)
let currentOpenChat=null
let popUp = document.getElementById("right-nav");
const exeOnClick = (u) => {
  u.addEventListener("click", () => {
    console.log("Clicked");
    if(currentOpenChat===u)
    {
      popUp.style.display=popUp.style.display==="flex"?"none":"flex"
    }
    else{
      if(currentOpenChat)
      {
        popUp.style.display="none"
      }
      popUp.style.display="flex"
      currentOpenChat=u
    }
  });
};
users.forEach(exeOnClick);


//instatiating a websocket connection between browser API and server side web socket
/*var io = io("ws://localhost:8080");

console.log("connection open");
function sendMessage(e) 
{
  e.preventDefault();
  const messageBox = document.getElementById("messageBox");
  let hostMsg = document.getElementById("messageBox").value;
  if (hostMsg) 
  {
    io.emit("message", hostMsg)
    document.getElementById("messageBox").value = "";
  }
  // websocket.send(hostMsg)
  messageBox.focus();
}
document.getElementById("send").addEventListener("click", sendMessage);
io.on('passingID',(ID)=>
  {
    currentClient=ID
    console.log("SenderID:  ", ID)
  })

//Rendering chats on the page
io.on("message", (messageObj) => {
  function renderRight()
  {
    console.log(messageObj.message);
    let chatBubble = document.createElement("p")
    chatBubble.style.textAlign='right'
    chatBubble.textContent = messageObj.message;
    document.getElementById("right-nav").appendChild(chatBubble);
  }
  function renderLeft()
  {
    console.log(messageObj.message);
    let chatBubble = document.createElement("p")
    chatBubble.style.textAlign='left'
    chatBubble.textContent = messageObj.message
    document.getElementById("right-nav").appendChild(chatBubble)
  }
  messageObj.sessionID===currentClient?renderLeft():renderRight()
})
io.on("error", (e) => {
  console.log("there was an error from the client-side: ", e);
});
*/