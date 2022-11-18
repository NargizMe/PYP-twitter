import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = "https://yyfyjsrswmqyleitjzfc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5Znlqc3Jzd21xeWxlaXRqemZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTg3NDgsImV4cCI6MTk4Mzc3NDc0OH0.I_pwE3jSQELURBm6n3LYYszr8fFUTZ0OKB6cCHk_5iA"
// const supabaseKey = process.env.REACT_APP_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase