import { useContext, createContext, useState, useEffect } from "react";
import  reactSupabase from "../supabaseClient";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        try {
            const token = localStorage.getItem('token');
            
            if(!token || token==='{}' || token.trim()==='')
                return;
            if(token){
                setLoggedIn(true);
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({username: payload.username});
        }    
        } catch (error) {
            console.error("Something went wrong on useEffect", error);   
        }
        
    },[])

    async function authenticate({email, password}){
        console.log(email + password);
        try {
            const {data, error} = await reactSupabase.auth.signInWithPassword({'email': email, 'password': password});
            if(error)
                throw error;
            console.log(data);

            login(data.session.access_token);
            return {message: "Login Successful"};

        } catch (error) {
            console.log("Incorrect Email or Password");
            console.error(error);
        }
    }

    const login = (token)=>{
        console.log(token);
        localStorage.setItem('token', token);
        setLoggedIn(true);
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({username: payload.username});
    }
    
    const logout = () =>{
        localStorage.removeItem('token');
        setLoggedIn(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{login, logout, authenticate, user, loggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}

