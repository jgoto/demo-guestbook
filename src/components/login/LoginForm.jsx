import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

export default function LoginForm(){
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5002/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            })

            const data = await response.json();

            if(response.ok){
                login(data.token);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleLogin}>
            Username <input type = "email" placeholder = "Enter Email" value = {email} 
                onChange={((e)=>setEmail(e.target.value))} required />
            <br />
            Password <input type = "password" placeholder = "Enter Password" value = {password} 
                onChange={((e)=>setPassword(e.target.value))} required />
            <button type="submit">Login</button>
        </form>
    )
}