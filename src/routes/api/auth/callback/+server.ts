import { redirect } from '@sveltejs/kit'

//! this callback is for auth by link
export const GET = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get('code')


  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  throw redirect(303, '/')
}