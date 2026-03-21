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
            <form className="edit_profile_form" onSubmit={handleSubmit}>
                <label>First Name: <input type="text"
                                        name = "first_name"
                                        value = {profileData.first_name}
                                        onChange={handleChange}
                                         /></label>
                <label>Last Name: <input type="text"
                                        name = "last_name"
                                        value = {profileData.last_name}
                                        onChange={handleChange}
                                         /></label>
                <label>Nickname: <input type="text"
                                        name = "nickname"
                                        value = {profileData.nickname}
                                        onChange={handleChange}
                                         /></label>
                <button type = 'submit'>Submit</button>
                <button onClick={onCancel}>Cancel</button>
            </form>
        </div>
    )
}