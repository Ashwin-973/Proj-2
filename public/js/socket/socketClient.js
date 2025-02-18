//establishing socket connection from frontend after login process has ended
export function initializeClientSocket()
{
    var socket=io("ws://localhost:8080")

    console.log("connection open");
    socket.on('passingID',(ID)=>{
          let currentClient=ID
          console.log("SenderID:  ", ID)
        })
    socket.on("valid_access_token",(user)=>
    {
      console.log('event received')
      if(user.role==='user')
      {
        // window.location.replace("http://127.0.0.1:5500/Proj2/Kill.html")
        console.log('redirect')
      }
      // **according to rbac redirect him to a different page
    })  
    socket.on("token:expired",async()=>
    {
      const options={
        method:'POST',
        credentials:'include'
      }
      let resBody
      try{
        const res=await fetch("http//localhost:8080/auth/refresh",options)
        resBody=res.json()
        if(!res.ok)
        {
          throw new Error(resBody.message)
        }
        console.log(resBody.message)
        socket.connect()
        return

      }
      catch(err)
      {
        console.log(err)

      }

    })
    socket.on('error', (e) => {
            console.log("there was an error from the server-side: ", e);
          });  
    
}