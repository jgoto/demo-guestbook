const supabase = require('../util/supabaseClient');

/**
 * Fetches the message feed ordered by creation time (newest first)
 * @returns {Promise<Array|undefined>}
 */
async function getFeed(){
    try {
        const feed = await supabase.from('messages').select('*').order('created_at', {ascending: false});
        return feed.data;
    } catch (error) {
        console.error('Error fetching feed', error);
    }
}

/**
 * Inserts a new message into the messages table in Supabase
 * 
 * @param {Object} post - Message payload to insert
 * @returns {Promise<Object|undefined>}
 * 
 * @description
 * Returns the Supabase insert response on success.
 * Logs an error and returns undefined on failure.
 */
async function postMessage(post){
    try {        
        const reply = await supabase.from('messages').insert(post);
        return reply;
    } catch (error) {
        console.error('Error adding post', error);
    }
}

module.exports = {getFeed, postMessage};