const supabase = require('../util/supabaseClient');

async function getFeed(){
    try {
        const feed = await supabase.from('messages').select('*').order('created_at', {ascending: false});
        
        return feed.data;
    } catch (error) {
        console.log('Error fetching feed', error);
    }
}

module.exports = {getFeed};