/**
 * selectAvatarSignedUrl
 * @param {string} user_id - of requesting user
 * @param {import('@supabase/supabase-js').SupabaseClient} userClient from requesting user
 * @returns {Promise<void>}
 */
async function selectAvatarSignedUrl(user_id, userClient){
    try {
        const {data} = await userClient.storage.from('avatars')
            .createSignedUrl(`avatars/${user_id}/${user_id}.jpg`, 172800);
        return data;
    } catch (error) {
        console.error(error)
    }
}

module.exports = {selectAvatarSignedUrl};