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
        <div className={"public_contact_form"}>
            <form onSubmit={handleSubmit}>
                <label>Name<input type = "text" 
                                name="name" 
                                value = {contact.name} 
                                onChange={handleChange} required /></label>
                <label>Email<input type = "email" 
                                name="email" 
                                value = {contact.email} 
                                onChange={handleChange} required /></label>
                <div className={'company'} style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: 0,
                    margin: '-1px',
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    border: 0 }}> 
                    <label>Company<input type = "text" 
                                name="company" 
                                value = {contact.company} 
                                onChange={handleChange}
                                autoComplete="off"
                                tabIndex="-1" /></label>
                </div>
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