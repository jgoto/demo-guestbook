import { useState } from "react";

export default function ContactForm({email, name, onSubmit}){
    const [contact, setContact] = useState({
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setContact((prev) => ({
            ...prev, [name]: value
        }));
    }

    function handleSubmit(event){
        event.preventDefault();
        onSubmit({
            ...contact,
            name: name,
            email: email,
        })      
    }

    return (
        <div className={"contact_form"}>
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
        </div>
    )
}