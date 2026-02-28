const {getFeed, postMessage} = require('../services/postServices');

async function routeGetFeed(req, res){
    try {
        const feed = await getFeed();
        res.json(feed);
        
    } catch (error) {
        console.error(error);
    }
}

async function routeNewPost(req, res){
    const post = {
        content: req.body.content,
        uuid: req.body.uuid
    }
    try {
        const reply = await postMessage(post);
        console.log("Requesting user data from API", reply)
        res.status(201).json(reply);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {routeGetFeed, routeNewPost};