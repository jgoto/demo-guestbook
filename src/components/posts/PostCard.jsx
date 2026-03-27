export default function PostCard({data}){
    return (
        <div className={'post-card'}>
            <h4>{data.content}</h4>
            <p>{data.display_name}</p>
        </div>
    )
}