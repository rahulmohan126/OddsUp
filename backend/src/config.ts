import dotenv from "dotenv";
dotenv.config()

module.exports = {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_PUBLIC_KEY
};