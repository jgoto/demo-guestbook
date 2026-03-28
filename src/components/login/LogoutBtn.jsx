import { useAuth } from "../../hooks/AuthContext";
import { NavLink } from "react-router-dom";

export default function LogoutBtn(){
    const {logout, loggedIn} = useAuth();
    function handleLogout(){
        if(window.confirm("Are you sure you want to log out?")){
            logout();
        }
    }

    return (
        <div className="logout-actons">
            <button className='logout-btn' type="submit" onClick={handleLogout}>Logout</button>
            {(loggedIn) && <h4><NavLink to='/changepassword' className='change-password-link'>Change your password</NavLink></h4> }
        </div>
    )
}