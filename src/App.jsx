import './App.css'
import { useEffect, useState } from 'react';
import supabase from './supabaseClient';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(()=>{
    const fetchMessage = async ()=> {
      const {data, error} = await supabase.from("messages").select("*").order("created_at",{ascending: false});
      if(error)
        console.error(error);
      else setMessages(data)
    };
    fetchMessage();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!newMessage.trim()) return;

    const {data, error} = await supabase.from("messages").insert([{content: newMessage}]);
    if(error)
      console.error(error);
    else setMessages([data[0], ...messages]);
    setNewMessage("");
  }

  return (
    <div>
      <h1>Demo Guestbook</h1>
      <form onSubmit={handleSubmit}>
        <input type = "text" value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} placeholder="Write a message..."/>
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((msg)=>(
          <li key={msg.id}>{msg.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
