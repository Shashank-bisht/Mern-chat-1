import React, { useContext } from 'react'
import Registerandloginform from './Registerandloginform'
import { UserContext } from './UserContext'

const Routes = () => {
    const {username, id} = useContext(UserContext)
    if (username){;
        return 'logged in' + username;
    }
  return (
    <Registerandloginform/>
  )
}

export default Routes