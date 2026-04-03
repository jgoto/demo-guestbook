import { usePosts } from '../../hooks/PostContext';

export default function NewPostForm({user, comment, setComment}){
    const {submitNewPost} = usePosts();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('submitting new post ' + comment);
            const response = await submitNewPost(comment, user);
            setComment('');
        } catch (error) {
            console.error(error);  
        }
    }

    return (
        
        <div>
            <form className={'message-form'} data-testid="new-post-form" onSubmit={handleSubmit}>
                <input type = "text" 
                    value={comment} 
                    onChange={(e)=>setComment(e.target.value)} 
                    aria-label = "Write a message"
                    placeholder="Write a message..."/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}