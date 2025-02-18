import { initializeClientSocket } from "../socket/socketClient.js"
const form=document.getElementById('form')
// let's keep credential1 as email for now
const credential1=document.getElementById('email/username')
const credential2=document.getElementById('password')

const formSubmission= async()=>
    {
        let res;
        let resBody;

        let payload={
            email:credential1.value,
            password:credential2.value
        }
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(payload)
        }
        try{

            res=await fetch("http://localhost:8080/users/login",options)
            resBody=await res.json()
            if(!res.ok)
            {
                throw new Error(resBody.message)
            }
            //user logged in..redirect them to main UI and get the JWT token
            console.log(`${resBody.status} , ${resBody.message}  `)
            console.log(`Tokens :${resBody.data}`)
            initializeClientSocket()
            return
        }
        catch(err)
        {
            if(res.status===400)
            {
                // call a FE validator function for incorrect email/password format
                console.error(err)
            }
            else if(res.status===401)
            {
                // redirect user to login page saying incorrect password for the given email
                console.warn(err)
            }
            else if(res.status===404)
            {
                // redirect to sign-up page, for the user to register (they haven't signed up)
                console.warn(err)
            }
            else{
                //render a server error page (error code :500)
                console.error(err)
            }

        }
}


form.addEventListener('submit',(e)=>
{
    e.preventDefault()
    formSubmission()
})