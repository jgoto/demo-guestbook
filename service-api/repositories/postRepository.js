const {supabase} = require('../util/supabaseClient');

/**
 * Select all messages and order by creation time (newest first)
 * @returns {Promise<Array|undefined>}
 */
async function selectAllmessages(){
    const {data, error} = await supabase.from('messages').select('*').order('created_at', {ascending: false});
    if(error)
        throw error;
    return data;
}

/**
 * Inserts a new message into the messages table in Supabase
 * @param {Object} post - Message payload to insert
 * @returns {Promise<Object|undefined>}
 * 
 * @description
 * Returns the Supabase insert response on success.
 * Logs an error and returns undefined on failure.
 */
async function createMessage(post){
    const {data, error} = await supabase.from('messages').insert(post);
    if(error)
        throw error;
    return data;
}

module.exports = {selectAllmessages, createMessage};