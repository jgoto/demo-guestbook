import { Navigate, replace } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export default function ProtectedRoute({children}){
    const {loggedIn} = useAuth();

    if(!loggedIn){
        return <Navigate to='/' replace />
    }

    return children;
}