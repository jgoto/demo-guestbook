const {supabase} = require('../util/supabaseClient');

async function getProfile(uuid){
    try {
        const { data } = await supabase.from('profiles')
            .select('*')
            .eq('user_id', uuid)
            .maybeSingle();       
        return data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {getProfile};