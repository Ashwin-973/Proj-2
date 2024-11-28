let clientID=[]
//opening chatbox on the click of every username
let usersNodeList = document.querySelectorAll(".chat-list");
let users = Array.from(usersNodeList);
console.log(users);
let popUp = document.getElementById("right-nav");
const exeOnClick = (u) => {
  u.addEventListener("click", () => {
    console.log("Clicked");
    if (popUp.style.display === "none") {
      popUp.style.display = "flex";
    } else {
      popUp.style.display = "none";
    }
  });
};
users.forEach(exeOnClick);
//instatiating a websocket connection between browser API and server side web socket

const ioF = io("ws://localhost:8080");

console.log("connection open");
function sendMessage(e) 
{
  e.preventDefault();
  const messageBox = document.getElementById("messageBox");
  let hostMsg = document.getElementById("messageBox").value;
  if (hostMsg) 
  {
    ioF.emit("message", hostMsg);
    document.getElementById("messageBox").value = "";
  }
  // websocket.send(hostMsg)
  messageBox.focus();
}
document.getElementById("send").addEventListener("click", sendMessage);
ioF.on('passingID',(payload)=>
  {
    clientID.append(payload)
  })

//Rendering chats on the page
ioF.on("message", (messageObj) => {
  clientID.forEach((id)=>
  {
    if(messageObj.sessionID===id)
    {
      console.log(data.message);
      let chatBubble = document.createElement("p")
      chatBubble.style.textalign='left'
      chatBubble.textContent = data.message;
      document.getElementById("right-nav").appendChild(chatBubble);
    }
    else{
      console.log(data.message);
      let chatBubble = document.createElement("p")
      chatBubble.style.textalign='right'
      chatBubble.textContent = data.message;
      document.getElementById("right-nav").appendChild(chatBubble);
    }
  })
})
ioF.on("error", (e) => {
  console.log("there was an error from the client-side: ", e);
});
