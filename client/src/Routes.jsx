import React, { useContext } from 'react'
import Registerandloginform from './Registerandloginform'
import { UserContext } from './UserContext'
import Chat from './Chat'
const Routes = () => {
    const {username, id} = useContext(UserContext)
    if (username){;
        return <Chat/>
    }
  return (
    <Registerandloginform/>
  )
}

export default Routes