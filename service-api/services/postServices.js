const {selectAllmessages, createMessage} = require('../repositories/postRepository');

/**
 * Fetches the message feed.
 * @returns {Promise<Array|undefined>}
 */
async function getFeed(){
    const data = await selectAllmessages();    
        return data;
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
async function createNewMessage(post){
    /** Enforce posting limits here when functionality is available */
    const data = await createMessage(post);
    return data
}

module.exports = {getFeed, createNewMessage};