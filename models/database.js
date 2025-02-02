const {Pool}=require('pg')
const dotenv=require('dotenv').config({path:"C:\\Users\\Ashwi\\Documents\\Web Development\\WebDEV\\Proj2\\.env"})
// console.log(dotenv)
const {DATABASE_USER,DATABASE_HOST,DATABASE_PORT,DATABASE_PASSWORD,DATABASE_NAME}=process.env
let pool=new Pool({
    user:DATABASE_USER,
    host:DATABASE_HOST,
    port:DATABASE_PORT,
    password:DATABASE_PASSWORD,
    database:DATABASE_NAME
})
async function connectionCheck()
{
        
    try{
        await pool.connect()
        console.log(`Connected to ${DATABASE_HOST}`)

    }
    catch(error)
    {
        console.error(`failed to connect to ${DATABASE_NAME}`)
        // throw new Error(error)
    }
    return 0;
}
connectionCheck()
module.exports=pool