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
        <div className="contact-form-container" data-testid="simple-contact-form">
            <form className='contact-form' onSubmit={handleSubmit}>
                <div className={'contact-form-group'}>
                    <label htmlFor="simple-subject">Subject</label>
                    <input type = "text" 
                        name="subject" 
                        id="simple-subject"
                        value = {contact.subject} 
                        onChange={handleChange} required />
                </div>
                <div className={'contact-form-group'}>
                    <label htmlFor="simple-message">Message</label>
                    <textarea
                        name="message" 
                        id="simple-message"
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