let usersNodeList = document.querySelectorAll(".chat-list")
let users = Array.from(usersNodeList)
console.log(users)
const exeOnClick= (u) => {
  u.addEventListener("click", () => {
    console.log("Clicked")
  })
}
users.forEach(exeOnClick)