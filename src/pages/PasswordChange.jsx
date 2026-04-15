import { useState } from "react"
import { useAuth } from "../hooks/AuthContext";
import { NavLink } from "react-router-dom";

export default function PasswordChange(){
    const {requestPwChange} = useAuth();
    const [editPw, setEditPw] = useState(true);
    const [msgSuccess, setMsgSuccess] = useState(null);
    const [pwChange, setPwChange] = useState({
        newPw: "",
        confirmNewPw: "",
    });
    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPwChange((prev) => ({
            ...prev, [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {success, error} = await requestPwChange(pwChange);
        setPwChange({newPw: "",confirmNewPw:""});
        if(!success)
            setMsg(error.message);
        else if(success){
            setMsg("Password Changed");
            setMsgSuccess(true);
            setEditPw(false);
        }
    }

    return (
        <div>
            <h3 className="app-subtitle">Change Password</h3>
            {msg&&<h4 className={msgSuccess ? "msg-success" : "msg-error"}>{msg}</h4>}
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-form-group">
                    <label htmlFor="new-pw">New Password: </label>
                    <input type = 'password' 
                    name="new-pw" 
                    value={pwChange.newPw}
                    onChange={handleChange} 
                    required />
                </div>
                <div className="auth-form-group">
                    <label htmlFor="confirm-new-pw">Confirm New Password: </label>
                    <input type = 'password'
                    name="confirm-new-pw"
                    value={pwChange.confirmNewPw}
                    onChange={handleChange} 
                    required />
                </div>
                <button className="auth-btn" type="submit">Submit</button>
                <h4><NavLink to='/login' className='change-password-link'>go back</NavLink></h4>
            </form>
            {(!editPw) && <li><NavLink to='/changepassword'>go back</NavLink></li>}
        </div>
    )
}