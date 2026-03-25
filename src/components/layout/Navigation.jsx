import { NavLink } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"

export default function Navigation(){
    const {loggedIn} = useAuth();
    return (
        <nav>
            <ul className={"nav"}>
                <li><NavLink to='/' >Guestbook</NavLink></li>
                {(loggedIn) && <li><NavLink to='/profile' >Profile</NavLink></li> }
                {(loggedIn) && <li><NavLink to='/wordcloud' >wordcloud</NavLink></li> }
                <li><NavLink to='/contact' >Contact</NavLink></li>
                <li><NavLink to='/login' >Login</NavLink></li>                
            </ul>
        </nav>
    )
}