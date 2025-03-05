import { createContext, useState } from "react";
import { useContext } from "react"
import { UserApi } from "../service/UserApi";


 const UserstateContext = createContext({
    user: null,
    authenticated :false ,
    setUser: ()=>{},
    logout: ()=>{},
    login: (values)=>{},
    setAuthenticated : ()=>{},
    setToken :()=>{}
})

export default function StudentContext({children}){
    const [user,setUser] = useState()
   

    const [authenticated , _setAuthenticated] = useState('true'=== window.localStorage.getItem('AUTHENTIFICARED'))

    const login = async (values)=> {

         await UserApi.getCsrfToken()
         return await UserApi.login(values)
    }

    const setAuthenticated=(isAuth)=>{
        _setAuthenticated(isAuth)
        window.localStorage.setItem('AUTHENTIFICARED',isAuth)

    }

    const setToken = (token) => {
        window.localStorage.setItem('token', token)
    }



    const logout = ()=>{
        setUser({})
        setToken(false)
        setAuthenticated(false)

    }




return <>
    <UserstateContext.Provider value={{
        user,
        setUser,
        authenticated,
        setAuthenticated,
        logout,
        login,
        setToken,
     }}>
        {children}
    </UserstateContext.Provider>
</>
}

export const UseUserContext = ()=>{
   return useContext(UserstateContext)
}
