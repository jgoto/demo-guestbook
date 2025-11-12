const {createClient} = require('@supabase/supabase-js');

console.log("Creating database client");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = supabase;