import { useAuth } from "../hooks/AuthContext"
import ContactForm from "../components/contact/ContactFrom";
import PublicContactForm from "../components/contact/PublicContatForm";

export default function Contact(){
    const {loggedIn} = useAuth();

    return (
        <div>
            <h2>Contact Us</h2>
            {(!loggedIn) ? <PublicContactForm /> : <ContactForm />}
        </div>
    )
}