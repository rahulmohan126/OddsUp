import { createClient } from '@supabase/supabase-js'

const { supabaseUrl, supabaseKey } = require("../config");

export const supabase = createClient(supabaseUrl, supabaseKey);