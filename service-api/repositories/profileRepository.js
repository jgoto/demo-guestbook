const {supabase} = require('../util/supabaseClient');

/**
 * Retrieves user's profile data from DB
 * @param {string} uuid - user_id
 * @param {import('@supabase/supabase-js').SupabaseClient} userClient - userClient - Supabase client authorized with requestor's token
 * @returns - {Promise<void>}
 */
async function selectProfile(uuid, userClient){
    try {
        const { data } = await userClient.from('profiles')
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
 * @param {import('@supabase/supabase-js').SupabaseClient} userClient - userClient - Supabase client authorized with requestor's token
 * @param {Object} changes - object with changes
 * @returns - {Promise<void>} - Updated profile
 */
async function updateProfile(uuid, userClient, changes){
    console.log(`UUID: ${uuid}`);
    const { data, error } = await userClient.from('profiles')
            .update(changes)
            .eq('user_id', uuid)
            .select()
            .single();
    if(error)
        throw error;
    return data;
}

module.exports = {selectProfile, updateProfile};