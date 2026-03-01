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

/**
 * Updates partial profile changes to the database
 * @param {string} uuid - user_id for the profile to change
 * @param {Object} changes - object with changes
 * @returns - {Promise<void>} - Updated profile
 */
async function patchProfile(uuid, changes){
    if(!uuid){
        throw new Error('No userId');
    }
    if(!changes || Object.keys(changes).length === 0){
        throw new Error('No changes provided');
    }

    const { data, error } = await supabase.from('profiles')
            .update(changes)
            .eq('user_id', uuid)
            .select()
            .single();
    
    if(error)
        throw error;
    return data;
}

module.exports = {getProfile, patchProfile};