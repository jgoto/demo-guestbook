const {supabase} = require('../util/supabaseClient')

/**
 * Insert contact request to the database
 * @param {Object} contact - contact request payload
 * @returns {Promise<Object|undefined>}
 *  
 * @description
 * Returns the Supabase insert response on success.
 * Logs an error and returns undefined on failure.
 */
async function insertContactRequest(contact){
    const {data, error} = await supabase.from('contact_requests').insert(contact);
    if(error)
        throw error;
    return data;
}

module.exports = {insertContactRequest};