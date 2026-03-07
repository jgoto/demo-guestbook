import { useContext, createContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProfileContext = createContext();

export function ProfileProvider({children}){
    const {loggedIn, user, userSession} = useAuth();
    const token = userSession?.access_token;
    const [profile, setProfile] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        if(token && user?.user_id){
            loadProfileData();
        }
    },[token, user?.user_id])

    async function loadProfileData(){
        if(!token){
            setLoading(false);
            return;
        }
        try {
            const [profileRes, avatarRes] = await Promise.all([
                fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/profile/view/${user.user_id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }),
                fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/avatar/view/${user.user_id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
            ]);
            const profile = await profileRes.json();
            const avatar = await avatarRes.json();
            setProfile(profile);
            setAvatar(avatar);
        } catch (error) {
            setError(`An error occured loading profile ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    const value = {profile, avatar, loading, loadProfileData, error};

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

export function useProfile(){
    return useContext(ProfileContext);
}