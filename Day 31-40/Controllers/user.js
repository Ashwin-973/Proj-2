const bcrypt=require('bcrypt')
const {userSignIn}=require('../Models/user')
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const handlingUser = async(req, res) => {
  if(1)
  {
    try 
    {
      let data=''
      req.on('data',(chunk)=>
      {
        data+=chunk
      })
      req.on('end',async()=>
      {
        const {email,username,password}=await JSON.parse(data) 
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
        if(errors.length)
        {
          return res.status(400).json({"status":"error","message":"errors"})
        }
      })
      console.log('valid credentials')
      console.log(username,email,password)
      const passwordHash= await bcrypt.hash(password,12)
      await userSignIn(username,email,passwordHash)
      return res.status(201).json({"status":"success" , "message":"User Signed-up Successfully"})
    }
    catch
    {
      return res.status(500).json({"status":"error" , "message":"Internal Server Error"})
    }

  }
    
}
module.exports={handlingUser,}