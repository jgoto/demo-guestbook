const {selectProfile, updateProfile} = require('../repositories/profileRepository');
const AppError = require('../errors/AppError');

/**
 * viewProfile
 * @param {string} uuid - user id of the requesting user
 * @param {import('@supabase/supabase-js').SupabaseClient} userClient - userClient - Supabase client authorized with requestor's token
 * @returns {Promise<void>}
 */
async function viewProfile(uuid, userClient){
    if(!uuid || typeof uuid!=='string' || uuid.trim()===''){
        throw new AppError('No user id', 400); 
    }
    const results = await selectProfile(uuid, userClient);
    if(!results) { throw new AppError('Record not found', 404)}
    return results;
}

/**
 * editProfile
 * @param {Object} payload - containing new data to update user profile
 * @param {import('@supabase/supabase-js').SupabaseClient} userClient - Supabase client authorized with requestor's token
 * @returns {Promise<void>}
 */
async function editProfile(userId, userClient, payload){
    console.log(payload);
    const results = await updateProfile(userId, userClient, payload);
    if(!results) { throw new AppError('Record not found', 404)};
    return results;
}

module.exports = {viewProfile, editProfile};