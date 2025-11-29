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
    const message = req.body.content;
    try {
        const reply = await postMessage(message);
        res.status(201).json(reply);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {routeGetFeed, routeNewPost};