const form = document.getElementById("form");
const email = document.getElementById("email");
const uname = document.getElementById("username");
const pword = document.getElementById("password");
const goldenYellow="#dba124"
const forestGreen="#1f6032"
const coralRed="#ff4d4f"



//email validation
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValidator=()=>
{
  console.log('blur')
  if(emailPattern.test(email.value))
  {
    email.style.borderColor=forestGreen
    document.querySelector('.email .error-popup').style.visibility="hidden"
  }
  else{
    email.style.borderColor=coralRed
    document.querySelector('.email .error-popup').style.visibility="visible"

  }
}
email.addEventListener('focus',()=>
{
  console.log('focus')
  email.style.borderColor=goldenYellow
})
email.addEventListener('blur',emailValidator)



//username validation
const usernameValidator=()=>
{
  if(uname.value.length>=5 && uname.value.length<=30)
    {
      uname.style.borderColor=forestGreen
      document.querySelector('.username .error-popup').style.visibility="hidden"
    }
    else
    {
      uname.style.borderColor=coralRed
      document.querySelector('.username .error-popup').style.visibility="visible"
    }
}

uname.addEventListener('focus',()=>
{
  console.log('focus')
  uname.style.borderColor=goldenYellow
})
uname.addEventListener('blur',usernameValidator)

//password validation
const passwordValidator=()=>
{
  const minlength=8
  const hasUpper=/[A-Z]/.test(pword.value)
  const hasLower=/[a-z]/.test(pword.value)
  const hasDigit=/\d/.test(pword.value)
  const hasSpecial=/[!@#$%^&*]/.test(pword.value)
  if(pword.value.length>=minlength && hasUpper && hasLower && hasDigit && hasSpecial)
  {
    pword.style.borderColor=forestGreen
    document.querySelector('.password .error-popup').style.visibility="hidden"
  }
  else{
    pword.style.borderColor=coralRed
    document.querySelector('.password .error-popup').style.visibility="visible"
  }

}
pword.addEventListener('focus',()=>
{
  console.log('focus')
  pword.style.borderColor=goldenYellow
})
pword.addEventListener('blur',passwordValidator)


//TOS agreement















// server-side validation
function serverSideValidator(fields)
{
  fields.forEach((i)=>
  {
    i.style.borderColor=coralRed
    document.querySelector('.i .error-popup').visibility="visible"
  })

}

async function formSubmission()
{
  let payload={email:email.value,username:uname.value,password:pword.value}
  const options={method:'POST',
    mode:'cors',
    headers:{'Content-type':'application/json'},
    body:JSON.stringify(payload)
  }
  try{
    let res=await fetch("http://localhost:8080/users/sign-up",options)
    console.log(res)
    const Data=await res.json()
    if(!res.ok)
    {
      console.log(`Invalid credentials have been identified by the server  STATUS : ${res.status}`)
      // loading invalid fields into errorPayload
      let errorPayload=Data.message    
      console.log("Error Message: ",errorPayload)
      console.log(typeof errorPayload)
      if(typeof errorPayload==='object')
      {
        serverSideValidator(errorPayload)
      }
    }
    else
    {
      window.location.replace("http://localhost:8080/users/login")
      console.log(`Server responded with a Success STATUS : ${res.status}`)
      console.log(Data.message)
    }

    

  }
  /*For Client side run time Errors like:
  Network error
  parse error
  DNS error*/
  catch(error)
  {
    console.log(error)
  }


}
form.addEventListener('submit',(e)=>
  {
    e.preventDefault()
    formSubmission()
  })