const bcrypt=require('bcrypt')
const pool=require('./database')
const {v4:uuidv4}=require('uuid')
const{pick}=require('../utils/dataUtils')
//?wrap within try... catch
const userSignIn=async(username,email,passwordHash)=>
{
    const userId=uuidv4()
    const query=`INSERT INTO users(id,username,email,password_hash) VALUES ($1,$2,$3,$4);`
    let values=[userId,username,email,passwordHash]
    await pool.query(query,values)
    return
}

let findUser=(email,password,cb)=>
{
    //add role to user object after some time
    let query='SELECT id,username,password_hash,role FROM users WHERE email = $1;'
    values=[email]
    pool.query(query,values)
    .then((result)=>
    {
        if(!result.rows.length)         //when no user is found by that email
        {
            return cb(null,null)
        }
        const storedHash=result.rows[0].password_hash
        bcrypt.compare(password,storedHash)
        .then((isMatch)=>
        {
            if(isMatch)
            {
                return cb(null,pick(result.rows[0],'id','username','role'))
            }
            // ! why is err not defined
            return cb(err,result.rows[0])
        })
        /*this catch block gets executed when 1.The stored hash is corrupted or in an invalid format 2.Memory allocation issues during comparison 3.Invalid salt rounds in the hash 4.System-level errors during the comparison operation thus handling technical/operational failures*/
        .catch((err)=>                         
        {
            console.log(err)
            return cb(err,null)
        })
    })
    /*Gets Executed At times of : 1.Database connection issues 2.Invalid SQL query syntax 4.Database server is down 5.Network connectivity problems 6.Permission issues when accessing the database*/
    .catch((err)=>
    {
        console.log(err)
        return cb(err,null)
    })
}

const storeJti=async(userId,jti)=>
{
    try{
        const query=`UPDATE users SET jti=$1 WHERE id=$2;`
        await pool.query(query,[jti,userId])
        return
    }
    catch(err)
    {
        throw new Error(err)
    }
}
const checkJti=async(userId)=>
{
    try{
        const query=`SELECT jti FROM users WHERE id = $1;`
        const result=await pool.query(query,[userId])
        console.log("checked JTI",result.rows)
        if (result.rows[0].jti)
        {
            console.log("True")
            return true
        }
        console.log("false")
        return false
    }
    catch(err)
    {
        throw new Error(err)
    }
}
/* const removeJti=()=>
{

}*/
module.exports={userSignIn,findUser,storeJti,checkJti}