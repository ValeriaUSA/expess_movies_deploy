import { createContext, useState } from "react";

export const GlobalContext =createContext()

export const Provider = ({children})=>{

    const [IsAuthenticated, setIsAuthenticated]=useState(false || localStorage.getItem('email'))


    return (
        <GlobalContext.Provider value={{IsAuthenticated,setIsAuthenticated}}>
            {children}
        </GlobalContext.Provider>
    )
}