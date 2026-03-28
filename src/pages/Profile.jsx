import { useProfile } from "../hooks/ProfileContext"
import { useAuth } from "../hooks/AuthContext";
import { useState } from "react";
import DisplayProfile from "../components/profile/DisplayProfile";
import EditProfile from "../components/profile/EditProfile";

export default function Profile(){
    const [isEditing, setIsEditing] = useState(false);
    const {editProfileForm, profile, avatar, loading, setLoading, loadProfileData} = useProfile();
    const {user} = useAuth();

    const toggleEditing = () => setIsEditing(prev => !prev);
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

    if(loading) return (<p>Loading...</p>);
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