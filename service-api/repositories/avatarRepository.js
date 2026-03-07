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
 * @param {string} user_id - ID of the user requesting the avatar
 * @param {import('@supabase/supabase-js').SupabaseClient} userClient - Supabase client scoped to the user
 * @returns {Promise<{ signedUrl: string } | null>}
 */
async function selectAvatarSignedUrl(user_id, userClient){
    try {
        const {data} = await userClient.storage.from('avatars')
            .createSignedUrl(`${user_id}/${user_id}.png`, 172800);
        return data;
    } catch (error) {
        console.error(error)
    }
}

module.exports = {selectAvatarSignedUrl};