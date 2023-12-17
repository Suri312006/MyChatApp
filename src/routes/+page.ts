// src/routes/profile/+page.ts
import { redirect } from '@sveltejs/kit'


export const load = async ({ parent }) => {
  const { supabase, session } = await parent()
  if (!session) {
    throw redirect(303, '/welcome')
  }

  const {data: otherUsers} = await supabase.from('users').select().neq('id', session.user.id)

  return {
    user: session.user,

  }
}

