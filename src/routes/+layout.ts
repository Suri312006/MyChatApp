// src/routes/+layout.ts
import { PUBLIC_SUPABASE_API_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import type { Database } from '../../types/supabase.types.js'
export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createSupabaseLoadClient<Database>({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_API_KEY,
    event: { fetch },
    serverSession: data.session,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  let logged_in_user = await supabase.from('users').select().eq("id", session!.user.id)

  return { supabase, session, logged_in_user: logged_in_user.data![0] }
}