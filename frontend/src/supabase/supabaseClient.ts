// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ffmtmryepxlwhduuleac.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmbXRtcnllcHhsd2hkdXVsZWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxNjk2MDgsImV4cCI6MjA0Mzc0NTYwOH0.Jvd48mb6FoDfKh2mVmdG2mYJE6W6c8CIq4BpXEUSq8k'; // Public key

const supabase : any = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
