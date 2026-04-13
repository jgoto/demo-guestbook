import { useAuth } from "../hooks/AuthContext";
import { useProfile } from "../hooks/ProfileContext";
import { useState } from "react";
import {submitContactForm} from "../helpers/submitContactForm";
import ContactForm from "../components/contact/ContactFrom";
import PublicContactForm from "../components/contact/PublicContactForm";

export default function Contact(){
    const {user, loggedIn, authLoaded} = useAuth();
    const {profile, profileLoaded} = useProfile();
    const [msg, setMsg] = useState("");
    const [submitted, setSubmitted] = useState(false);
    /*const readyToRender = authLoaded && profileLoaded;

    if(!readyToRender)
        return (<p>Loading...</p>);*/

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
        return(<p data-testid='submit-msg'>{msg}</p>)

    return (
        <div>
            <h2>Contact Us</h2>
            {(!loggedIn) ? <PublicContactForm onSubmit={handleSubmit}/> : 
            <ContactForm email={user.email} name={`${profile.first_name} ${profile.last_name}`} onSubmit={handleSubmit}/>}
        </div>
    )
}