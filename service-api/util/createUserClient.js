const {createClient} = require('@supabase/supabase-js');

/**
 * createUserClient
 * @param {string} token - Supabase token
 * @returns {import('@supabase/supabase-js').SupabaseClient} userClient - Supabase client authorized with supplied token
 */
function createUserClient(token){
    const userClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
        global: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    })
    return userClient;
}

module.exports = {createUserClient}