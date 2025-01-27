const pool=require('./database')
// console.log('pool info',pool)
console.log('entered user model')
const userSignIn=async(username,email,passwordHash)=>
{
    console.log('entered user sign in')
    const query=`INSERT INTO users("Username","Email","Password") VALUES ($1,$2,$3);`
    let values=[username,email,passwordHash]
    const result=await pool.query(query,values)
    return result.rows[0]

}
module.exports={userSignIn,}