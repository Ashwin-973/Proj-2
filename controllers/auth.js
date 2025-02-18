/*handles:
Login credential validation
Token generation/verification
Session management
Login attempts tracking
Password comparison logic */

const{findUser}=require('../models/user')
const {generateAccessToken}=require('../utils/jwtService.js')
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

//do this with callbacks
const loginController=(req,res)=>
{
    let data=''
    let invalid=[]
    req.on('data',(chunk)=>
    {
        data+=chunk.toString()
    })
    req.on('end',()=>
    {
        const {email,password}=JSON.parse(data)
        emailPattern.test(email) ? null:invalid.push("email")
        passwordPattern.test(password) ? null:invalid.push("password")
    
    if(invalid.length)
    {
        return res.status(400).json(
            {   
                status:"error",
                code:"AUTH_INVALID_CREDENTIALS",
                message:"Missing or Invalid format of Credentials",  //invalid array to be sent as the message while deployment
                details:{
                    timestamp:new Date().toISOString(),
                    path:"/users/login",
                    type:"authentication_error"
                }
            })
    }
    else{
        findUser(email,password,function(err,user)
        {
            if(!err && user)
            {
                // **call a JWT token provider function and pass JWT either through headers or store in local/session storage through cookies
                let tempToken=generateAccessToken(user)
                console.log("Both Tokens : ",tempToken)
                res.cookie('jwt',tempToken[0],{
                    httpOnly:true,
                    secure:process.env.NODE_ENV === 'production',
                    sameSite:'strict',
                    maxAge:3600000,
                    credentials:true
                }).cookie('refresh_token',tempToken[1],{
                    httpOnly:true,
                    secure:process.env.NODE_ENV === 'production',
                    sameSite:'strict',
                    maxAge:3600000,
                    credentials:true
                })
                return res.status(200).json({
                    status:"success",
                    code:"AUTH_VALID_CREDENTIALS",
                    message:"User Logged In",
                    data:tempToken,
                    details:{
                        timestamp:new Date().toISOString(),
                        path:"/users/login",
                        type:"authentication_success"
                    }

                })
            }
            else if(err && user)
            {
                return res.status(401).json({
                    status:"error",
                    code:"AUTH_INVALID_CREDENTIALS",
                    message:"Invalid Credentials",
                    details:{
                        timestamp:new Date().toISOString(),
                        path:"/users/login",
                        type:"authentication_failure"
                    }


                })
            }
            else if(!err && !user){
                    return res.status(404).json({
                        status:"error",
                        code:"AUTH_USER_NOT_FOUND",
                        message:"User hasn't been registered : Signup to Login",
                        details:{
                            timestamp:new Date().toISOString(),
                            path:"/users/login",
                            type:"user_error"
                    }
                })

            }
            else{
                return res.status(500).json({
                    status:"error",
                    code:"INTERNAL_SERVER_ERROR",
                    message:"Database Server Error",
                    details:{
                        timestamp:new Date().toISOString(),
                        path:"/users/login",
                        type:"datasource_down"
                    }
            })
        }
    })
}
})
}

module.exports={loginController,}