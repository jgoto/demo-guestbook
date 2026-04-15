import { useState } from "react"
export default function EditProfile({onSubmit, mergedData, onCancel}){
    const [profileData, setProfileData] = useState({
        first_name: mergedData.first_name,
        last_name: mergedData.last_name,
        nickname: mergedData.nickname
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProfileData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(profileData)
    }

    return (
        <div>
            <h3 className="app-subtitle">Edit your profile</h3>
            <form className="edit_profile_form" onSubmit={handleSubmit}>
                <div className="profile-form-group">
                    <label>First Name: </label>
                    <input 
                        type="text" 
                        name = "first_name" 
                        value = {profileData.first_name} 
                        onChange={handleChange}/>
                </div>
                <div className="profile-form-group">
                    <label>Last Name: </label>
                    <input type="text"
                        name = "last_name"
                        value = {profileData.last_name}
                        onChange={handleChange} />
                </div>
                <div className="profile-form-group">
                    <label>Nickname: </label>
                    <input type="text"
                        name = "nickname"
                        value = {profileData.nickname}
                        onChange={handleChange} />
                </div>
                <div className="profile-form-actions">
                    <button type = 'submit'>Submit</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}