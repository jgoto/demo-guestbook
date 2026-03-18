import { useProfile } from "../hooks/ProfileContext"
import { useAuth } from "../hooks/AuthContext";
import DisplayProfile from "../components/profile/DisplayProfile";
import EditProfile from "../components/profile/EditProfile";

export default function Profile(){
    const {editProfileForm, profile, avatar, loading} = useProfile();
    const {user} = useAuth();

    if(loading) return (<p>Loading...</p>);
    if(!profile) return (<p>No Profile found</p>);

    const mergedData = {...profile, ...avatar, email: user.email};
    return (
        <div>
            <p>Profile</p>
            <EditProfile onSubmit={editProfileForm} mergedData={mergedData} />
        </div>
        
    )
}