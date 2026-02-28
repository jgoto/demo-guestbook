import { useProfile } from "../hooks/ProfileContext"

export default function Profile(){
    const {profile, fetchProfile, loading} = useProfile();

    if(loading) return (<p>Loading...</p>);
    if(!profile) return (<p>No Profile found</p>)

    return (
        <div>
            <p>Profile</p>
            <div>
                <ul>
                    <li>{`first_name: ${profile.first_name}`}</li>
                    <li>{`last_name: ${profile.last_name}`}</li>
                    <li>{`nickname: ${profile.nickname}`}</li>
                </ul>
            </div>
        </div>
        
    )
}