import { useEffect, useState } from 'react';
import reactSupabase from '../supabaseClient';
import Navigation from '../components/Navigation';

export default function Guestbook(){
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

  useEffect(()=>{
    const fetchMessage = async ()=> {
      const response = await fetch('http://localhost:5002/api/posts/feed',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }        
      });
      const feed = await response.json();
      setMessages(feed || []);
    };
    fetchMessage();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!newMessage.trim()) return;

    const {data, error} = await reactSupabase.from("messages").insert([{content: newMessage}]);
    if(error)
      console.error(error);
    else setMessages([data[0], ...messages]);
    setNewMessage("");
  }

  return (
    <div>
      <Navigation />
      <h1>Demo Guestbook</h1>
      <form onSubmit={handleSubmit}>
          <input type = "text" value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} placeholder="Write a message..."/>
          <button type="submit">Send</button>
      </form>
      <ul>
          {messages.map((msg)=>(
          <li key={msg.id}>{msg.content}</li>))}
      </ul>
      </div>
  )

}