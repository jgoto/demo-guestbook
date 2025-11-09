import { NavLink } from "react-router-dom"

export default function Navigation(){
    return (
        <nav>
            <ul>
                <li><NavLink to='/' >Guestbook</NavLink></li>
                <li><NavLink to='/wordcloud' >wordcloud</NavLink></li>
                <li><NavLink to='/contact' >Contact</NavLink></li>
                <li><NavLink to='/login' >Login</NavLink></li>                
            </ul>
        </nav>
    )
}