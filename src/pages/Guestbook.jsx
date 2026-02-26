import { useState } from 'react';
import reactSupabase from '../supabaseClient';
import Navigation from '../components/Navigation';
import { useAuth } from '../hooks/AuthContext';
import { usePosts } from '../hooks/PostContext';

export default function Guestbook(){
    const {user} = useAuth();
    const {loading, feed, error, submitNewPost} = usePosts();
    const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await submitNewPost(comment, user.id);
    } catch (error) {
      console.error(error);  
    }

    
  }

  if(loading){
    return(<p>Loading Feed...</p>)
  }

  return (
    <div>
      <Navigation />
      <h1>Demo Guestbook</h1>
      <form onSubmit={handleSubmit}>
          <input type = "text" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Write a message..."/>
          <button type="submit">Send</button>
      </form>
      <ul>
          {feed.map((post)=>(
          <li key={post.id}>{post.content}</li>))}
      </ul>
      </div>
  )

}