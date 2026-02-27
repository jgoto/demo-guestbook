const {supabase} = require('../util/supabaseClient');

/**
 * Retrieves user's profile data from DB
 * @param {string} uuid - user_id
 * @returns - {Promise<void>}
 */
async function getProfile(uuid){
    try {
        const { data } = await supabase.from('profiles')
            .select('*')
            .eq('user_id', uuid)
            .maybeSingle();       
        return data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {getProfile};