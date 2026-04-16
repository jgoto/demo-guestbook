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
        <div className='public-contact-form' data-testid='public-contact'>
            <form className='contact-form' onSubmit={handleSubmit}>
                <div className={'contact-form-group'}>
                    <label htmlFor='name-input'>Name</label>
                    <input type = 'text'
                        name='name' 
                        id='name-input'
                        value = {contact.name} 
                        onChange={handleChange} required />                    
                </div>
                <div className={'contact-form-group'}>
                    <label htmlFor='email-input'>Email</label>
                    <input type = "email" 
                        name="email" 
                        id='email-input'
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
                    <label htmlFor='subject-input'>Subject</label>
                    <input type = "text" 
                        name="subject" 
                        id="subject-input"
                        value = {contact.subject} 
                        onChange={handleChange} required />
                </div>
                <div className={'contact-form-group'}>
                    <label htmlFor="message-textarea">Message</label>
                    <textarea
                        name="message" 
                        id="message-textarea"
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