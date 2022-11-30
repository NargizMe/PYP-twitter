import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = "https://yyfyjsrswmqyleitjzfc.supabase.co"
const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_TOKEN as string)

export default supabase