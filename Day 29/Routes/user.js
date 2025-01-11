const express=require('express')
const router=express.Router()
const {handlingUser}=require('../Controllers/user')
router.get('/',(req,res)=>
    {
        res.send('Welcome to users endpoint')
    })
router.get('/sign-up',(req,res)=>
{
    res.render('signUP')
})
router.post('/sign-up',handlingUser)
module.exports=router