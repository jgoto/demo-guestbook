import { useContext, createContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProfileContext = createContext();

export function ProfileProvider({children}){
    const {loggedIn, user} = useAuth();
    const token = user?.token;
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        if(token){
            fetchProfile();
        }
    },[token, user?.id])

    async function fetchProfile(){
        if(!token)
        {
            setLoading(false);
            return;
        }
        try {
            console.log(user);
            const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/profile/view/${user.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            const result = await response.json();
            setProfile(result);
        } catch (error) {
            setError(`An error occured loading profile ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    const value = {profile, loading, fetchProfile};

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

export function useProfile(){
    return useContext(ProfileContext);
}