// src/routes/profile/+page.ts
import { redirect } from '@sveltejs/kit'

export const load = async ({ parent }) => {
  const { supabase, session } = await parent()
  if (!session) {
    throw redirect(303, '/welcome')
  }
  const { data: tableData } = await supabase.from('countries').select('*')

  const {data: allUsers} = await supabase.from('users').select('*')

  const {data: userData} = await supabase.from('users').select().eq('id', session.user.id)



  return {
    user: session.user,
    tableData,
    allUsers,
    userData,
  }
}

