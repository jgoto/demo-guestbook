import { useProfile } from "../hooks/ProfileContext"
import { useAuth } from "../hooks/AuthContext";
import { useState } from "react";
import DisplayProfile from "../components/profile/DisplayProfile";
import EditProfile from "../components/profile/EditProfile";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Profile(){
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const {editProfileForm, profile, avatar, loading, setLoading, loadProfileData} = useProfile();
    const {user, authLoaded} = useAuth();

    const toggleEditing = () => setIsEditing(prev => !prev);

    useEffect(() => {
        if(authLoaded && !user){
            navigate('/');
        }
    },[authLoaded, user, navigate]);

    const handleSubmit = async (newProfile) => {
        
        try {
            setLoading(true);
            await editProfileForm(newProfile);    
            setIsEditing(false);
            loadProfileData();
        } catch (error) {
            console.error(error);
        }
    }

    if(loading && !authLoaded) return (<p>Loading...</p>); 
       
    if(!profile) return (<p>No Profile found</p>);

    const mergedData = {...profile, ...avatar, email: user.email};
    return (
        <div>
            {isEditing 
                ? <EditProfile onSubmit={handleSubmit} mergedData={mergedData} onCancel={toggleEditing} /> 
                : <DisplayProfile mergedData={mergedData} onEdit={toggleEditing} />
            }
        </div>
        
    )
}