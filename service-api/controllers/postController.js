const {getFeed} = require('../services/postServices');

async function routeGetFeed(req, res){
    try {
        const feed = await getFeed();
        res.json(feed);
        
    } catch (error) {
        console.error(error);
    }
}

module.exports = {routeGetFeed};