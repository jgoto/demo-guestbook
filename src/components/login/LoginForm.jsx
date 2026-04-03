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

        const session = await authenticate({email, password})
        if(!session)
            return;

        navigate('/');
    }

    return (
        <div className='login-container'>
            <form onSubmit={handleLogin} className='login-form'>
                <div className = 'login-form-group'>
                    <label htmlFor="email" >Username: </label>
                    <input type = "email"
                        id='login-email'                         
                        placeholder = "Enter Email" 
                        value = {email} 
                        onChange={e=>setEmail(e.target.value)} required />
                </div>
                <div className="login-form-group">
                    <label htmlFor="password">Password: </label>
                    <input type = "password"
                        id="login-password" 
                        placeholder = "Enter Password" 
                        value = {password} 
                        onChange={e=>setPassword(e.target.value)} required />
                </div>
                <div className='login-actions'>
                    <button className='login-btn' type="submit">Login</button>
                </div>
            </form>
        </div>        
    )
}