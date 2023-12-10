import React, { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from './UserContext'
const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const {setUsername: setLoggedInUsername, setId} = useContext(UserContext)

  async function register(ev){
    ev.preventDefault();
    // posting data like username and password to register endpoint
  const {data} =  await axios.post('/register',{username,password}, { withCredentials: true })
  setLoggedInUsername(username)
  setId(data.id)
  }
  return (
    <div className='bg-blue-50 h-screen flex items-center'>
      <form className='w-64 mx-auto mb-10' onSubmit={register}>
       <input type="text" value={username} onChange={ev => setUsername(ev.target.value)}placeholder='username' className='block w-full p-2 mb-2 border' />
       <input type="password" value={password} onChange={ev => setPassword(ev.target.value)}placeholder='password' className='block w-full p-2 mb-2 border' />
       <button className='bg-blue-500 text-white block w-full rounded-sm py-3'>Register</button>
      </form>
    </div>
  )
}

export default Register