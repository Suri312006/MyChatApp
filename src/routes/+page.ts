// src/routes/profile/+page.ts
import { redirect } from '@sveltejs/kit'

export const load = async ({ parent }) => {
  const { supabase, session } = await parent()
  if (!session) {
    throw redirect(303, '/welcome')
  }
  const { data: tableData } = await supabase.from('countries').select('*')

  return {
    user: session.user,
    tableData,
  }
}