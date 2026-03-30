import { useState } from "react"

export default function PublicContactForm({onSubmit}){
    const [contact, setContact] = useState(
        {
            name: "",
            email: "",
            company: "",
            subject: "",
            message: ""
        }
    );

    const handleChange = (e) => {
        const {name, value} = e.target;
        setContact((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(event){
        event.preventDefault();
        onSubmit({
            ...contact
        })
    }

    return (
        <div className={"public-contact-form"}>
            <form className='contact-form' onSubmit={handleSubmit}>
                <div className={'contact-form-group'}>
                    <label>Name</label>
                    <input type = "text" 
                        name="name" 
                        value = {contact.name} 
                        onChange={handleChange} required />                    
                </div>
                <div className={'contact-form-group'}>
                    <label>Email</label>
                    <input type = "email" 
                        name="email" 
                        value = {contact.email} 
                        onChange={handleChange} required />                    
                </div>
                <div className={'contact-form-group company'} style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: 0,
                    margin: '-1px',
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    border: 0 }}>
                    <label>Company</label>
                    <input type = "text" 
                        name="company" 
                        value = {contact.company} 
                        onChange={handleChange}
                        autoComplete="off"
                        tabIndex="-1" />
                    
                </div>
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