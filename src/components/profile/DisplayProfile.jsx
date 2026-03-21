import Avatar from "./Avatar"
export default function DisplayProfile({mergedData, onEdit}){
    return (
    <div>
        <Avatar src={mergedData.signedUrl} size={"md"} alt={mergedData.nickname} />
        <button onClick={onEdit}>Edit</button>
        <ul>
            <li>{`first_name: ${mergedData.first_name}`}</li>
            <li>{`last_name: ${mergedData.last_name}`}</li>
            <li>{`nickname: ${mergedData.nickname}`}</li>
            <li>{`email: ${mergedData.email}`}</li>
        </ul>
    </div>
    )
}