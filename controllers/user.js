const bcrypt=require('bcrypt')
const {userSignIn}=require('../models/user')
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const handlingUser =(req, res) => {
  try 
  {
    let data=''
    req.on('data',(chunk)=>
    {
      data+=chunk.toString()
    })
    req.on('end',async ()=>
    {
      const {email,username,password}=JSON.parse(data) 
      let errors=[]
      if (!emailPattern.test(email)) 
      {
        errors.push("email")
      }
      if (!username.length<=30 && !username.length>=5) 
      {
        errors.push("username")
      }
      if (!passwordPattern.test(password)) 
      {
        errors.push("password")
      }
      if(errors.length > 0)
      {
        console.log("Invalid Credentials")
        return res.status(400).json({"status":"error","message":errors})
      }
      console.log('Valid credentials')
      const passwordHash= await bcrypt.hash(password,12)
      await userSignIn(username,email,passwordHash)
      
      return res.status(201).json({"status":"success" , "message":"User Signed-up Successfully"})
      
      
    })
  }
  catch
  {
    return res.status(500).json({"status":"error" , "message":"Internal Server Error"})
  }

  
    
}
module.exports={handlingUser,}