import LoginForm from "../components/login/LoginForm"
import LogoutBtn from "../components/login/LogoutBtn"
import { useAuth } from "../hooks/AuthContext"


export default function Login(){
    const {loggedIn, loginMsg} = useAuth();
    return (
        <div>
            <h3 className="login-title">Login</h3>
            {
                (!loggedIn) ? <LoginForm /> : <LogoutBtn />                              
            }
            {
                (loginMsg!=="") && <p>{loginMsg}</p>
            }
        </div>
    )
}