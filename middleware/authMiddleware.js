const {verifyAccessToken}=require('../utils/jwtService')
const {parseCookieString}=require('../utils/dataUtils')
const socketConnectAuth=(socket,next)=>
{
    const parsedCookies=parseCookieString(socket.handshake.headers.cookie)
    if(!parsedCookies.jwt){
    
        console.log('No token')
        return next(new Error("AUTH_REQUIRED"))
    }
    try{
        verifyAccessToken(parsedCookies.jwt,function(err,userObj){

            if(err && err.name==='JsonWebTokenError')
            {
                return next(new Error("INVALID_ACCESS_TOKEN / TAMPERED_ACCESS_TOKEN"))
            }
            else if(err && err.name==='TokenExpiredError')
            {
                //what to do if refresh token doesn't exist
                socket.emit("token:expired")
                return next("ACCESS_TOKEN_EXPIRED")

            }
            socket.user=userObj //?should I attach the token or the user obj?
            console.log("decrypted cookie : ",userObj)
            // check if role is user then redirect to main UI
            socket.emit("valid_access_token",socket.user)

            return next()
        })

    }
    catch(err)
    {
        console.log('error ')
        console.log(err.name)
        console.log(err.stack)
    }

}
   
module.exports={socketConnectAuth,}