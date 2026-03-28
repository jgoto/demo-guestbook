const {supabase} = require('../util/supabaseClient');

/**
 * Generates a signed URL for a user's avatar in the Supabase storage bucket.
 *
 * Storage structure (bucket: "avatars"):
 *
 * avatars/
 * ├── {user_id}/
 * │   └── {user_id}.png
 *
 * Example:
 * avatars/
 * ├── 123/
 * │   └── 123.png
 *
 * @param {string} user_id - ID for the user owning the avatar
 * @returns {Promise<{ signedUrl: string } | null>}
 */
async function selectAvatarSignedUrl(user_id){
    try {
        const {data} = await supabase.storage.from('avatars')
            .createSignedUrl(`${user_id}/${user_id}.png`, 172800);
        return data;
    } catch (error) {
        console.error(error)
    }
}

module.exports = {selectAvatarSignedUrl};