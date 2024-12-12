const pool=require('./database')

const userSignIn=async(username,email,passwordHash)=>
{
    const query=`INSERT INTO users(Username,Email,Password) VALUES ($1,$2,$3)`
    let values=[username,email,passwordHash]
    await pool.query(query,values)

}
module.exports={userSignIn,}