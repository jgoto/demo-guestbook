import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        try {
            const token = localStorage.getItem('token');
        if(token){
            setLoggedIn(true);
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({username: payload.username});
        }    
        } catch (error) {
            console.error("Something went wrong on useEffect");   
        }
        
    },[])

    const login = (token)=>{
        console.log("foo");
        localStorage.setItem('token', token);
        setLoggedIn(true);
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({username: payload.username});
    }
    
    const logout = () =>{
        console.log("bar");
        localStorage.removeItem('token');
        setLoggedIn(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{login, logout, user, loggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}

