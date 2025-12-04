import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseApiKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

const reactSupabase = createClient(supabaseUrl, supabaseApiKey);

export default reactSupabase;