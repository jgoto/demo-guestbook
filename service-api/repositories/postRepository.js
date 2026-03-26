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
 * Select all messages and join it with the author's profile data and order by creation time (newest first)
 * @returns {Promise<Array|undefined>}
 */
async function selectMessagesWithAuthors(){
    const {data, error} = await supabase.from('messages').select('*, profiles(id, first_name, nickname)').order('created_at', {ascending: false});
    if(error)
        throw error;
    return data;
}

/**
 * Inserts a new message into the messages table in Supabase
 * @param {import('@supabase/supabase-js').SupabaseClient} userClient - userClient - Supabase client authorized with requestor's token
 * @param {Object} post - Message payload to insert
 * @returns {Promise<Object|undefined>}
 * 
 * @description
 * Returns the Supabase insert response on success.
 * Logs an error and returns undefined on failure.
 */
async function createMessage(userClient, post){
    const {data, error} = await userClient.from('messages').insert(post);
    if(error)
        throw error;
    return data;
}

module.exports = {selectAllmessages, selectMessagesWithAuthors, createMessage};