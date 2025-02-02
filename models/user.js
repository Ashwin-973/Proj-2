const bcrypt=require('bcrypt')
const pool=require('./database')


const userSignIn=async(username,email,passwordHash)=>
{
    console.log('entered user sign in')
    const query=`INSERT INTO users("Username","Email","Password") VALUES ($1,$2,$3);`
    let values=[username,email,passwordHash]
    await pool.query(query,values)
    return

}



let findUser=(email,password,cb)=>
{
    let query='SELECT * FROM users WHERE "Email" = $1;'
    values=[email]
    pool.query(query,values)
    .then((result)=>
    {
        if(!result.rows.length)         //when no user is found by that email
        {
            return cb(null,null)
        }
        const storedHash=result.rows[0].Password
        bcrypt.compare(password,storedHash)
        .then((isMatch)=>
        {
            if(isMatch)
            {
                return cb(null,result.rows[0])
            }
            return cb(err,result.rows[0])
        })
        /*this catch block gets executed when 1.The stored hash is corrupted or in an invalid format 2.Memory allocation issues during comparison 3.Invalid salt rounds in the hash 4.System-level errors during the comparison operation thus handling technical/operational failures*/
        .catch(()=>                         
        {
            return cb(err,null)
        })
    })
    /*Gets Executed During : 1.Database connection issues 2.Invalid SQL query syntax 4.Database server is down 5.Network connectivity problems 6.Permission issues when accessing the database*/
    .catch((err)=>
    {
        console.log(err)
        return cb(err,null)
    })
}


module.exports={userSignIn,findUser}