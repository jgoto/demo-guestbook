import { useState, useEffect } from "react";
import Avatar from "../profile/Avatar";
import { usePosts } from "../../hooks/PostContext";

export default function PostCard({data}){
    const [avatarSignedUrl, setAvatarSignedUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const {fetchPostAvatar} = usePosts();

    useEffect(()=>{
        let isMounted = true;

        const fetchAvatar = async () => {
            if(!data.user_id || typeof fetchPostAvatar !== 'function'){
                if(isMounted) setLoading(false);
                return;
            }
            
            try {
                const url = await fetchPostAvatar(data.user_id);
                if(isMounted){
                    setAvatarSignedUrl(url)
                }
            } catch (error) {
                console.error(`failed to fetch avatar for ${data.user_id}: ${error}`);
            } finally {
                if(isMounted) setLoading(false)
                }
            }
            fetchAvatar();
            return () => {isMounted = false};
        },[data.user_id, fetchPostAvatar])
    
    if(loading)
        return(<p>loading...</p>)

    return (
        <div className={'post-card'}>
            <div className={'card-avatar-container'}>
                <Avatar src={avatarSignedUrl || 'profile00.png'} size={"sm"} alt={`${data.display_name} avatar`} />
            </div>
            <div className={'card-detail-container'}>
                <h4>{data.content}</h4>
                <p>{data.display_name}</p>
            </div> 
        </div>
    )
}