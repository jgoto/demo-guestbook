import { useEffect, useState } from 'react';
import reactSupabase from '../supabaseClient';
import Navigation from '../components/Navigation';

export default function Guestbook(){
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [flagRefresh, setFlagRefresh] = useState(true);

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
    if(flagRefresh){
      fetchMessage();
      setFlagRefresh(false);
    }
  },[flagRefresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!newMessage.trim()) return;

    console.log(newMessage);

    const response = await fetch('http://localhost:5002/api/posts/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: newMessage
      })
    });
    if(response.status===201)
      setFlagRefresh(true);
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