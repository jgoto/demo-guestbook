import { useProfile } from "../hooks/ProfileContext"
import { useAuth } from "../hooks/AuthContext";
import Avatar from "../components/profile/Avatar";

export default function Profile(){
    const {profile, loading} = useProfile();
    const {user} = useAuth();

    if(loading) return (<p>Loading...</p>);
    if(!profile) return (<p>No Profile found</p>);

    const mergedData = {...profile, email: user.email};
    console.log(mergedData);
    return (
        <div>
            <p>Profile</p>
            <div>
                <Avatar src={mergedData.avatar_url} size={"md"} alt={mergedData.nickname} />
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