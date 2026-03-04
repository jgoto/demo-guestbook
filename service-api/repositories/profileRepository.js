const {supabase} = require('../util/supabaseClient');

/**
 * Retrieves user's profile data from DB
 * @param {string} uuid - user_id
 * @returns - {Promise<void>}
 */
async function selectProfile(uuid){
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

/**
 * Updates partial profile changes to the database
 * @param {string} uuid - user_id for the profile to change
 * @param {Object} changes - object with changes
 * @returns - {Promise<void>} - Updated profile
 */
async function updateProfile(uuid, changes){
    const { data, error } = await supabase.from('profiles')
            .update(changes)
            .eq('user_id', uuid)
            .select()
            .single();
    if(error)
        throw error;
    return data;
}

module.exports = {selectProfile, updateProfile};