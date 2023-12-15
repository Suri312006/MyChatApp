// src/routes/profile/+page.ts
import { redirect } from '@sveltejs/kit'

export const load = async ({ parent }) => {
  const { supabase, session } = await parent()
  if (!session) {
    throw redirect(303, '/welcome')
  }
  const { data: tableData } = await supabase.from('countries').select('*')

  const {data: otherUsers} = await supabase.from('users').select().neq('id', session.user.id)

  const {data: userData} = await supabase.from('users').select().eq('id', session.user.id)

  console.log("others", otherUsers)

  return {
    user: session.user,
    tableData,
    otherUsers,
    userData,
  }
}

