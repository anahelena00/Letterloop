/// /*<reference types="vite/client" />
/*load Vite's client dictionary before reading this file */

/*import { createClient } from '@supabase/supabase-js';

/*const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Oops! Missing Supabase environment variables in your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
*/
import { createClient } from '@supabase/supabase-js';

// Hardcoded directly so Vite doesn't need to read the buggy .env file!
const supabaseUrl = 'https://pulrlyzzuilujooqbues.supabase.co';
const supabaseAnonKey = 'sb_publishable_kZdwn-S8olzouMp5vxr7Lg_CUcts0QY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
