import { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useProfile } from '../hooks/ProfileContext';
import { usePosts } from '../hooks/PostContext';
import NewPostForm from '../components/posts/NewPostForm';
import PostCard from '../components/posts/PostCard';

export default function Guestbook(){
    const {user, loggedIn} = useAuth();
    const {loading, feed} = usePosts();
    const {profile} = useProfile();
    const [comment, setComment] = useState("");

  if(loading){
    return(<p>Loading Feed...</p>)
  }

  return (
    <div>
      {(loggedIn) && <NewPostForm user = {user.user_id} comment = {comment} setComment = {setComment} /> }
      <div className={'message-list'}>
          {feed.map((post)=>(
          <PostCard key={post.id} data={{display_name: post.profiles.display_name, 
                                          content: post.content,
                                          user_id: post.profiles.user_id}} />))}
      </div>
      </div>
  )

}