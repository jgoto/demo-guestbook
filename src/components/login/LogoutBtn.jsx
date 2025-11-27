import { useAuth } from "../../hooks/AuthContext";

export default function LogoutBtn(){
    const {logout} = useAuth();
    function handleLogout(){
        logout();
    }

    return (
        <div>
            <button type="submit" onClick={handleLogout}>Logout</button>
        </div>
    )
}