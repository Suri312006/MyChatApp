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

  console.log("join table testing", await supabase
				.from('messages')
				.select(`*, users(*)`)
				.eq('conversation_id', 'fd171c51-c397-45b5-bce7-7bd0456ec3ae'))

  return {
    user: session.user,
    tableData,
    otherUsers,
    userData,
  }
}

