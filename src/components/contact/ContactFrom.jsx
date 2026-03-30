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
        <div className="contact-form-container">
            <form className='contact-form' onSubmit={handleSubmit}>
                <div className={'contact-form-group'}>
                    <label>Subject</label>
                    <input type = "text" 
                        name="subject" 
                        value = {contact.subject} 
                        onChange={handleChange} required />
                </div>
                <div className={'contact-form-group'}>
                    <label>Message</label>
                    <textarea
                        name="message" 
                        value={contact.message} 
                        onChange={handleChange} required />
                </div>
                <div className={'contact-actions'}>
                    <button type="submit">Submit</button>
                </div>
                
            </form>
        </div>
    )
}