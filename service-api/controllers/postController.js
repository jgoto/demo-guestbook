const {getFeed, createNewMessage} = require('../services/postServices');

/** routeGetFeed
 * Fetch all messages as a feed
 * @param {import('express'.Request)} req - Express Request
 * @param {import('express'.Response)} res - Express Response
 * @returns {Promise<void>}
 * @throws http 500 status if request to database fails
 * @description
 * return status 200 if request succeeds
 * status 500 if there are errors.
 */
async function routeGetFeed(req, res){
    try {
        const feed = await getFeed();
        res.status(200).json(feed);        
    } catch (error) {
        console.error(error);
        res.status(500).json;
    }
}

/** RouteCreateMessage
 * Create a new message with a payload from the request
 * @param {import('express'.Request)} req - Express Request
 * @param {import('express'.Response)} res - Express Response
 * @returns {Promise<void>}
 * @description
 * returns http status 200 on success
 * returns http status 500 on failure
 */
async function routeCreateMessage(req, res){
    const post = {
        content: req.body.content,
        uuid: req.body.uuid
    }
    try {
        const reply = await createNewMessage(post);
        res.status(201).json(reply);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {routeGetFeed, routeCreateMessage};