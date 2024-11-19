
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