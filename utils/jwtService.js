const {storeJti}=require('../models/user')
const {checkJti}=require('../models/user')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const {v4:uuidv4}=require('uuid') //?to provide jti and store in DB
const dotenv=require('dotenv').config({path:"C:\\Users\\Ashwi\\Documents\\Web Development\\WebDEV\\Proj2\\.env"})

const{ACCESS_SIGN_SECRET,ACCESS_SIGN_ALGORITHM,ACCESS_TOKEN_EXPIRY,REFRESH_SIGN_SECRET,REFRESH_SIGN_ALGORITHM,REFRESH_TOKEN_EXPIRY}=process.env

const generateAccessToken=(user)=>
{
  //add more properties to the jwt like headers,payload and signature
    const options={
        algorithm:ACCESS_SIGN_ALGORITHM,
        expiresIn:ACCESS_TOKEN_EXPIRY
    }
    if(!checkJti(user.id))
    {
      return [jwt.sign(user,ACCESS_SIGN_SECRET,options),generateRefreshToken(user)] //return an array containing both access token and refresh token 
    }
    return [jwt.sign(user,ACCESS_SIGN_SECRET,options),null] //return an array containing only the access token

}
const verifyAccessToken=(authCookie,cb)=>
{
  try{
    let data=jwt.verify(authCookie,ACCESS_SIGN_SECRET)
    return cb(null,data)
  }
  catch(err)
  {
    console.log(err.stack)
    return(err,null)
  }

}
const generateRefreshToken=(user)=>
{
  //refresh token must include only the necessary properties
  user.jti=uuidv4()
  console.log(`User Obj with jti ${JSON.stringify(user)}`)
  const options={
    algorithm:REFRESH_SIGN_ALGORITHM,
    expiresIn:REFRESH_TOKEN_EXPIRY
  }
  storeJti(user.id,user.jti)
  return jwt.sign(user,REFRESH_SIGN_SECRET,options) //only returns the payload part
}

const verifyRefreshToken=(refreshToken,cb)=>
{
  try{
    const decoded=jwt.verify(refreshToken,REFRESH_SIGN_SECRET)
    return cb(null,decoded)
  }
  catch(err)
  {
    console.log(err)
    return cb(err)

  }
}
module.exports={generateAccessToken,verifyAccessToken,verifyRefreshToken}
