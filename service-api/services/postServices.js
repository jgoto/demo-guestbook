const supabase = require('../util/supabaseClient');

async function getFeed(){
    try {
        const feed = await supabase.from('messages').select('*').order('created_at', {ascending: false});
        return feed.data;
    } catch (error) {
        console.error('Error fetching feed', error);
    }
}

async function postMessage(post){
    try {        
        const reply = await supabase.from('messages').insert(post);
        return reply;
    } catch (error) {
        console.error('Error adding post', error);
    }
}

module.exports = {getFeed, postMessage};