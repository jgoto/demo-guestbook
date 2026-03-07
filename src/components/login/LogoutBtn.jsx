import { useAuth } from "../../hooks/AuthContext";
import { NavLink } from "react-router-dom";

export default function LogoutBtn(){
    const {logout, loggedIn} = useAuth();
    function handleLogout(){
        logout();
    }

    return (
        <div>
            <button type="submit" onClick={handleLogout}>Logout</button>
            {(loggedIn) && <li><NavLink to='/changepassword' >Change your password</NavLink></li> }
        </div>
    )
}