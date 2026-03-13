import { useAuth } from "../hooks/AuthContext"
import { useState } from "react";
import {submitContactForm} from "../helpers/submitContactForm";
import ContactForm from "../components/contact/ContactFrom";
import PublicContactForm from "../components/contact/PublicContactForm";

export default function Contact(){
    const {user, loggedIn} = useAuth();
    const [msg, setMsg] = useState("");
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(payload){
        try {
            const message = await submitContactForm(payload);
            setMsg(message);
            setSubmitted(true);
        } catch (error) {
            setMsg(error.message);
            setSubmitted(true);            
        }
    }

    if(submitted)
        return(<p>{msg}</p>)

    return (
        <div>
            <h2>Contact Us</h2>
            {(!loggedIn) ? <PublicContactForm onSubmit={handleSubmit}/> : 
            <ContactForm user={user} onSubmit={handleSubmit}/>}
        </div>
    )
}