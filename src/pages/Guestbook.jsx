import { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { usePosts } from '../hooks/PostContext';
import NewPostForm from '../components/posts/NewPostForm';

export default function Guestbook(){
    const {user, loggedIn} = useAuth();
    const {loading, feed} = usePosts();
    const [comment, setComment] = useState("");

  if(loading){
    return(<p>Loading Feed...</p>)
  }

  return (
    <div>
      {(loggedIn) && <NewPostForm user = {user.user_id} comment = {comment} setComment = {setComment} /> }
      <ul>
          {feed.map((post)=>(
          <li key={post.id}>{post.content}</li>))}
      </ul>
      </div>
  )

}