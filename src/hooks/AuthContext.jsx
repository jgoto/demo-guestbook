import { useContext, createContext, useState, useEffect } from "react";
import  reactSupabase from "../supabaseClient";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginMsg, setLoginMsg] = useState("");

    useEffect(()=>{
        try {
            const token = localStorage.getItem('token');
            
            if(!token || token==='{}' || token.trim()==='')
                return;
            if(token){
                setLoggedIn(true);
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({id: payload.sub,
                    email: payload.email,
                    'token': token
                });
        }    
        } catch (error) {
            console.error("Something went wrong on useEffect", error);   
        }
        
    },[])

    async function authenticate({email, password}){
        try {
            const {data, error} = await reactSupabase.auth.signInWithPassword({'email': email, 'password': password});
            if(error)
                throw error;

            setUserState(data.session.access_token);
            return {message: "Login Successful"};

        } catch (error) {
            setLoginMsg("Incorrect Email or Password");
            console.error(error);
        }
    }

    const setUserState = (token)=>{
        localStorage.setItem('token', token);
        setLoggedIn(true);
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({'id': payload.sub});
        setLoginMsg("");
    }
    
    const logout = () =>{
        localStorage.removeItem('token');
        setLoginMsg("You have logged out");
        setLoggedIn(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{setUserState, logout, authenticate, user, loggedIn, loginMsg}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}

