const express=require('express')
const router=express.Router()
const {handlingUser}=require('../controllers/user')
const {loginController}=require('../controllers/auth')
router.get('/',(req,res)=>
    {
        res.send('Welcome to users endpoint')
    })

router.get('/sign-up',(req,res)=>
{
    res.render('signUP')
})
router.post('/sign-up',handlingUser)


router.get('/login',(req,res)=>
{
    res.render('login')
})
router.post('/login',loginController)
module.exports=router