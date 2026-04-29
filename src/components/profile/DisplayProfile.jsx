import Avatar from "./Avatar"
export default function DisplayProfile({mergedData, onEdit}){
    return (
    <div className={'profile-display-container'}>
        <h3 className={'app-subtitle'}>{`${mergedData.first_name || ''} ${mergedData.last_name}`}</h3>
        <div className={'profile-display-card'}>
            <div className={'profile-avatar-container'}>
                <Avatar src={mergedData.signedUrl} size={"md"} alt={mergedData.nickname} />
            </div>
            <div className={'profile-details-container'}>
                <ul className={'profile-details-list'} data-testid="profile-details">
                    <li data-testid="profile-fname">
                        <span className="profile-detail-label">First Name: </span>
                        <span className="profile-detail-value">{mergedData.first_name}</span>
                    </li>
                    <li data-testid="profile-lname">
                        <span className="profile-detail-label">Last Name: </span>
                        <span className="profile-detail-value">{mergedData.last_name}</span>
                    </li>
                    <li data-testid="profile-nickname">
                        <span className="profile-detail-label">Nickname: </span>
                        <span className="profile-detail-value">{mergedData.nickname}</span>
                    </li>
                    <li data-testid="profile-email">
                        <span className="profile-detail-label">Email: </span>
                        <span className="profile-detail-value">{mergedData.email}</span>
                    </li>
                </ul>
            </div>            
        </div>
        <button onClick={onEdit}>Edit</button>
    </div>
    )
}