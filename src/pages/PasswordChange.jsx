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
            <h3>Change Password</h3>
            {msg&&<h4 className={msgSuccess ? "msg-success" : "msg-error"}>{msg}</h4>}
            <form onSubmit={handleSubmit}>
                <label><input type = 'password' 
                    name="newPw" 
                    value={pwChange.newPw}
                    onChange={handleChange} 
                    required /> New Password </label>
                <label><input type = 'password'
                    name="confirmNewPw"
                    value={pwChange.confirmNewPw}
                    onChange={handleChange} 
                    required /> Confirm New Password </label>
                <button type="submit">Submit</button>
            </form>
            {(!editPw) && <li><NavLink to='/changepassword'>go back</NavLink></li>}
        </div>
    )
}