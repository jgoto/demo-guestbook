import { useContext, createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';

const ProfileContext = createContext();

export function ProfileProvider({children}){
    const {authLoaded, user, userSession, reloadAuth, loggedIn} = useAuth();
    const token = userSession?.access_token;
    const [profile, setProfile] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileLoaded, setProfileLoaded] = useState(false);
    const [error, setError] = useState(null);

    const reloadProfile = useCallback(() => {
        loadProfileData();
}, [loadProfileData]);

    useEffect(()=>{
        console.log('Profile updating');
        if(!authLoaded) return;
        if(!user?.user_id){
            setProfile(null);
            setProfileLoaded(true);
        }
        
        console.log("Attempting to load profile data");
        loadProfileData();
    },[authLoaded, user?.user_id])

    async function loadProfileData(){
        if(!token){            
            setLoading(true);
            console.log(`no token. Set loading to ${loading}`);
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
                    },                    
                })
            ]);
            if(!profileRes.ok)
                throw new Error("Profile load failed");
            if(!avatarRes.ok)
                throw new Error("Avatar load failed");
            const profile = await profileRes.json();
            const avatar = await avatarRes.json();
            setProfile(profile);
            setAvatar(avatar);
        } catch (error) {
            setError(`An error occured loading profile ${error.message}`);
        } finally {
            setLoading(false);
            setProfileLoaded(true);
        }
    }

    async function editProfileForm(newProfile){
        if(!token){
            return ({msg: "You must login to make changes"});
        }            
        try {
            const result = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/profile/update/${user.user_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ ...newProfile })
            })
            if(!result.ok)
                throw new Error("Error saving profile");
        } catch (error) {
            console.error("Profile save failed");
        } 
    }

    const value = useMemo(() => ({profile, avatar, loading, setLoading, loadProfileData, editProfileForm, 
        error, profileLoaded, reloadProfile}), [profile, avatar, loading, setLoading, loadProfileData, editProfileForm, 
            profileLoaded, error, reloadProfile]);

    return (
        <ProfileContext.Provider value={value}>
            {/*!loading ? children : <p>Loading Profile</p> */}
            {children}
        </ProfileContext.Provider>
    )
}

export function useProfile(){
    return useContext(ProfileContext);
}