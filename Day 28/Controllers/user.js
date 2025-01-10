const bcrypt=require('bcrypt')
const {userSignIn}=require('../Models/user')
const handlingUser = async(req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) 
        {
      console.log("All of these are required parameters");
      res.status(400).json({ error: "invalid Credentials" });
    }
    console.log('valid credentials')
    console.log(username,email,password)
    const passwordHash= await bcrypt.hash(password,12)
    await userSignIn(username,email,passwordHash)
    res.status(201).json({success:'User created successfully'})
  } 
  catch
  {
    res.status(500).json({unprecedented:'Internal Server Error'})
  }
}
module.exports={handlingUser,}