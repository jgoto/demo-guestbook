import { useProfile } from "../hooks/ProfileContext"
import { useAuth } from "../hooks/AuthContext";
import Avatar from "../components/profile/Avatar";

export default function Profile(){
    const {profile, loading} = useProfile();
    const {user} = useAuth();

    if(loading) return (<p>Loading...</p>);
    if(!profile) return (<p>No Profile found</p>)

    return (
        <div>
            <p>Profile</p>
            <div>
                <Avatar src={profile.avatar_url} size={"md"} alt={profile.nickname} />
                <ul>
                    <li>{`first_name: ${profile.first_name}`}</li>
                    <li>{`last_name: ${profile.last_name}`}</li>
                    <li>{`nickname: ${profile.nickname}`}</li>
                    <li>{`email: ${user.email}`}</li>
                </ul>
            </div>
        </div>
        
    )
}