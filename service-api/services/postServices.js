const { normalizePath } = require('vite');
const { AppError } = require('../errors/AppError');
const {selectAllmessages, selectMessagesWithAuthors, createMessage} = require('../repositories/postRepository');

/**
 * Fetches the message feed.
 * @returns {Promise<Array|undefined>}
 */
async function getFeed(){
    const data = await selectAllmessages();    
        return data;
}

/**
 * Fetches the message feed with Author data
 * @returns {Promise<Array|undefined>}
 */
async function getFeedWithAuthors(){
    const data = await selectMessagesWithAuthors();
    if(!data)
        throw new Error("Something went wrong");
    const normalizedData =normalizePosts(data);
    return normalizedData;
}

/**
 * Normalizes an array of post objects by ensuring each author/profile has a `display_name`.
 *
 * @param {Array<Object>} data - Array of post objects fetched from the database. Each post
 *   is expected to have a `profiles` property containing author information, e.g.:
 *   {
 *     id: number,
 *     text: string,
 *     profiles: {
 *       user_id: string,
 *       first_name?: string,
 *       nickname?: string
 *     }
 *   }
 *
 * @returns {Array<Object>} A new array of posts where each `profiles` object has a
 *   guaranteed `display_name` property. The `display_name` is assigned as follows:
 *   1. Use `nickname` if present.
 *   2. Otherwise, use `first_name` if present.
 *   3. If neither exists, defaults to `'Anonymous'`.
 **/
function normalizePosts(data){
    return data.map(post => {
        const profile = post.profiles;

        return {
            ...post,
            profiles: {
                ...profile,
                display_name: profile?.nickname ||
                profile?.first_name ||
                'Anonymous'
            }
        }
    })
}

/**
 * requests a new message to be created
 * 
 * @param {Object} post - Message payload to insert
 * @returns {Promise<Object|undefined>}
 * 
 * @description
 * Returns insert response on success.
 */
async function createNewMessage(userClient, post){
    /** Enforce posting limits here when functionality is available */
    const data = await createMessage(userClient ,post);
    return data;
}

module.exports = {getFeed, getFeedWithAuthors, normalizePosts, createNewMessage};