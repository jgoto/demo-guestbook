import { useProfile } from "../hooks/ProfileContext"
import { useAuth } from "../hooks/AuthContext";
import Avatar from "../components/profile/Avatar";

export default function Profile(){
    const {profile, avatar, loading} = useProfile();
    const {user} = useAuth();

    if(loading) return (<p>Loading...</p>);
    if(!profile) return (<p>No Profile found</p>);

    const mergedData = {...profile, ...avatar, email: user.email};
    return (
        <div>
            <p>Profile</p>
            <div>
                <Avatar src={mergedData.signedUrl} size={"md"} alt={mergedData.nickname} />
                <ul>
                    <li>{`first_name: ${mergedData.first_name}`}</li>
                    <li>{`last_name: ${mergedData.last_name}`}</li>
                    <li>{`nickname: ${mergedData.nickname}`}</li>
                    <li>{`email: ${mergedData.email}`}</li>
                </ul>
            </div>
        </div>
        
    )
}