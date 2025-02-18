
// use DTO to improve clarity and ORM's like sequelize for peoduction ready applications

function pick(obj, ...props) {
    return props.reduce((result, prop)=>
    {
      result[prop] = obj[prop];
      return result;
    },{})
  }

// utility function that parses raw string cookie into a familiar object
function parseCookieString(cookie){
  const parsedCookies=cookie.split(';').reduce((res,field)=>
    {
        const prop=field.trim().split('=')
        return {...res,[prop[0]]:prop[1]}
    },{})

    return parsedCookies
}

module.exports={pick,parseCookieString}