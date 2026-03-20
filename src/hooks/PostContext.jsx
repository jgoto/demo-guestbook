import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const PostContext = createContext();

export function PostProvider({children}){
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {userSession} = useAuth();
    const token = userSession?.access_token;

    const fetchFeed = async ()=>{
        try {
            const response = await fetch('http://localhost:5000/api/posts/feed',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const newFeed = await response.json();
            setFeed(newFeed || []);     
        } catch (error) {
            console.error("Something went wrong", error)
            setError(error);
        } finally {
            setLoading(false);
        }        
    }

    const submitNewPost = async (newComment, userId) => {
        try {
            if(!newComment.trim()) 
            {
                console.log("ending early");
                return;
            }
            if(!token){
                console.log("Token missing or invalid");
                return;
            }

            const response = await fetch('http://localhost:5000/api/posts/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    'content': newComment,
                    'uuid': userId
                })
            });
            if(response.status===201){
                fetchFeed();
                console.log("Feed loaded");
            }
                } catch (error) {
            setError(error);
        }
    }

    useEffect(() =>{
        fetchFeed();
    }, [])

    const value = {feed, loading, error, submitNewPost}

    return (
        <PostContext.Provider value = {value}>
            {children}
        </PostContext.Provider>
    )
}

export function usePosts(){
    return useContext(PostContext);
}