import React, { useState } from 'react';
import UserContext from './Context';
import {logoutApi} from './rest_api/js/data'



const Auth = (props) => {
    const [user, setUser] = useState(props.user ? {
        ...props.user,
        loggedIn: true
      } : null)
      
      const logIn = (userObject) => {
        setUser({
          ...userObject,
          loggedIn: true
        })
      }
    
      const logOut = async () => {
        await logoutApi();
        setUser({
          loggedIn: false
        })
      }
    
    return (
        <UserContext.Provider value={{
            user,
            logIn,
            logOut
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default Auth;