import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY;

console.log("SUPABASE URL:", supabaseUrl);
console.log("SUPABASE API KEY: ", supabaseApiKey);

const supabase = createClient(supabaseUrl, supabaseApiKey);

export default supabase;