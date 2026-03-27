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
 * Fetches all messages along with basic author profile information.
 *
 * Each message is joined with its associated profile and returned in
 * reverse chronological order (newest messages first).
 *
 * @async
 * @function selectMessagesWithAuthors
 * @returns {Promise<Array<{
 *   id: number,
 *   created_at: string,
 *   content: string,
 *   profiles: {
 *     id: string,
 *     first_name: string,
 *     nickname: string
 *   }
 * }>>}
 *
 * @throws {Error} If the database query fails.
 *
 * @example
 * const messages = await selectMessagesWithAuthors();
 * // [
 * //   {
 * //     id: 1,
 * //     created_at: "2026-03-27T12:00:00Z",
 * //     content: "Hello world",
 * //     profiles: {
 * //       id: "uuid",
 * //       first_name: "Jane",
 * //       nickname: "jdoe"
 * //     }
 * //   }
 * // ]
 */
async function selectMessagesWithAuthors(){
    const {data, error} = await supabase.from('messages').select('*, profiles!inner(user_id, first_name, nickname)').order('created_at', {ascending: false});
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