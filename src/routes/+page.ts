// src/routes/profile/+page.ts
import { redirect } from '@sveltejs/kit'


export const load = async ({ parent }) => {
  const { supabase, session } = await parent()
  if (!session) {
    throw redirect(303, '/welcome')
  }

  const {data: otherUsers} = await supabase.from('users').select().neq('id', session.user.id)


  const { data: conversations } = await supabase
  .from('conversations')
  .select(`*, user1(*), user2(*)`)
  .or(`user1.eq.${session?.user.id}, user2.eq.${session?.user.id}`);

console.log('conversatiosn', conversations);

return {

  conversations
,
otherUsers
};
}

