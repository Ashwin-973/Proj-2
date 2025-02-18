const express=require('express')
const { parseCookieString } = require('../utils/dataUtils')
const {verifyRefreshToken, generateAccessToken} = require('../utils/jwtService')
const{pick}=require('../utils/dataUtils')
const router=express.Router()

router.post('/refresh',(req,res)=>
{
    //cookie or cookies?
    const parsedCookies=parseCookieString(req.cookies)
    if(!parsedCookies.refresh_token)
    {
        return res.status(404).json({
            message:"No Refresh Token Found"
        })
    }
    try{
        verifyRefreshToken(parsedCookies.refresh_token,function(err,decoded){
            if(err && (err.name==='TokenExpiredError' || err.name==='JsonWebTokenError'))
                {
                    return res.status(401).json({
                        status:"error",
                        code:"INVALID_REFRESH_TOKEN",
                        message:"redirect to login/log me out"
                    })
                }
                const newAccessToken=generateAccessToken(pick(decoded,'id','username','role'))
                return res.cookie('jwt',newAccessToken).status(200).json({
                    status:"success",
                    code:"VALID_REFRESH_TOKEN",
                    message:"I was provided with a new , jwt call authmiddleware / redirect me to main UI"
        
                })
            })
    }
    catch(err)
    {
        console.log(err)

    }
    
})
module.exports=router