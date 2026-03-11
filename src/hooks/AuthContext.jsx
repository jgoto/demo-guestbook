import { useContext, createContext, useState, useEffect } from "react";
import  reactSupabase from "../supabaseClient";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginMsg, setLoginMsg] = useState("");
    const [userSession, setUserSession] = useState(null);

    useEffect(()=>{
        checkSession();

        const {data: listener} = reactSupabase.auth.onAuthStateChange((_event, session) => {
            setUserSession(session);
            setUser(session?.user ? {user_id: session.user.id, email: session.user.email} : null);
            setLoggedIn(!!session);
        });

        return () => listener.subscription.unsubscribe();
    },[])

    const checkSession = async () =>  {
        const {data} = await reactSupabase.auth.getSession();
        const s = data.session;
        setUserSession(s);
        setUser(s?.user ? {user_id: s.user.id, email: s.user.email} : null);
        setLoggedIn(!!s);
    }

    async function authenticate({email, password}){
        try {
            const {data, error} = await reactSupabase.auth.signInWithPassword({'email': email, 'password': password});
            if(error)
                throw error;

            setUserState(data.session);
            return {message: "Login Successful"};

        } catch (error) {
            setLoginMsg("Incorrect Email or Password");
            console.error(error);
        }
    }

    const setUserState = (session)=>{
        if(!session)
            return;
        localStorage.setItem('token', session.access_token);
        setUserSession(session);
        setLoggedIn(true);
        setUser({ user_id: session.user.id, email: session.user.email });
        setLoginMsg("");
    }
    
    const logout = async () =>{
        await reactSupabase.auth.signOut();
        localStorage.removeItem('token');
        setLoginMsg("You have logged out");
        setLoggedIn(false);
        setUser(null);
    }

    const requestPwChange = async (pwChange) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=]).{8,}$/;
        if(pwChange.newPw !== pwChange.confirmNewPw)
            return {success: false, error: new Error("Passwords must match")};
        if (!passwordRegex.test(pwChange.newPw)) {
            return { success: false, error: "Password must be 8+ chars, include upper/lowercase, number & special character" };
        }
        const {error} = await reactSupabase.auth.updateUser({password: pwChange.newPw});
        if(error)
            return {success: false, error: error};
        return {success: true};
    }

    return (
        <AuthContext.Provider value={{setUserState, logout, authenticate, requestPwChange, user, loggedIn, loginMsg, userSession}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}

