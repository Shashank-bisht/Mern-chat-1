import React, { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from './UserContext'
const Registerandloginform = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('register')
  const {setUsername: setLoggedInUsername, setId} = useContext(UserContext)

  async function handleSubmit(ev){
    ev.preventDefault();
    try{
      const url = isLoginOrRegister === 'register' ? 'register' : 'login'
      // posting data like username and password to register endpoint
    const {data} =  await axios.post(url,{username,password}, { withCredentials: true })
  
  //The data variable in your code snippet will contain the response data from the HTTP POST request made with Axios. Specifically, it will contain the payload returned by the server in response to the /register endpoint.
  
    setLoggedInUsername(username)
    setId(data.id)
    
    }catch(error){
  console.log(error)
    }
    }
    
  return (
    <div className='bg-blue-50 h-screen flex items-center'>
      <form className='w-64 mx-auto mb-10' onSubmit={handleSubmit}>
        {/* username */}
       <input type="text" value={username} onChange={ev => setUsername(ev.target.value)}placeholder='username' className='block w-full p-2 mb-2 border' />
       {/* password */}
       <input type="password" value={password} onChange={ev => setPassword(ev.target.value)}placeholder='password' className='block w-full p-2 mb-2 border' />
       {/* button */}
       <button className='bg-blue-500 text-white block w-full rounded-sm py-3'>
        {/* if state is register show register otherwise show login */}
        {isLoginOrRegister==='register'? 'Register': 'Login'}</button>
       <div className='text-center mt-2'> 
       {/* && is used to render jsx  */}
       {isLoginOrRegister === 'register' && (
        <div>
        Already a member?  <span></span>
        <button onClick={()=> setIsLoginOrRegister('login')}> Login here</button> 
        </div>
     )}
     {isLoginOrRegister === 'login' && (
      <div>
      Dont have an account?  <span></span>
      <button onClick={()=> setIsLoginOrRegister('register')}>Register</button> 
      </div>
     )}
      </div>
      </form>
    </div>
  )
}

export default Registerandloginform