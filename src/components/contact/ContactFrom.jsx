import { useState } from "react";
import {useAuth} from "../../hooks/AuthContext";

export default function ContactForm(){
    const {user} = useAuth();
    const [contact, setContact] = useState({
        subject: "",
        message: ""
    });
    const [msg, setMsg] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setContact((prev) => ({
            ...prev, [name]: value
        }));
    }

    async function handleSubmit(event){
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/contact/send`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                user_id: user.user_id,
                email: user.email,
                subject: contact.subject,
                message: contact.message
          
            })
        })
        const data = await response.json();
        if(response.ok){
            setContact({subject: "", message: ""});
            setSubmitted(true);
            setMsg(data.message);
            console.log(data.msg);
        }
        } catch (error) {
            console.error(error);
            setMsg("Something went wrong");
        }     
    }

    return (
        <div className={"contact_form"}>
            {(submitted) ? (<p>{msg}</p>) : (
                <form onSubmit={handleSubmit}>
                <label>Subject<input type = "text" 
                                name="subject" 
                                value = {contact.subject} 
                                onChange={handleChange} required /></label>
                <label>Message<textarea
                                name="message" 
                                value={contact.message} 
                                onChange={handleChange} required /></label>
                <button type="submit">Submit</button>
            </form>
            )}          
        </div>
    )
}