import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

export default function LoginForm(){
    const {authenticate} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const token = await authenticate({email, password})
        if(!token)
            return;

        navigate('/');
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