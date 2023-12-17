import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
export const ssr = false;
export const load = (async ({ parent }) => {
	
	const { supabase, session } = await parent();

    
  if ( session?.user.aud !== "authenticated"){

    throw redirect(301, "/signup")
  }
  

	// we want to load the user's friends but we can load all other users for now
	//fetch the conversations this person is in, coupled with the users in each convo
    
    // quite possibly the sexiest sql_call ive done here holy moly
	const { data: conversations } = await supabase
		.from('conversations')
		.select(`*, user1(*), user2(*)`)
		.or(`user1.eq.${session?.user.id}, user2.eq.${session?.user.id}`);

	console.log('conversatiosn', conversations);

	return {

		conversations
	};
}) satisfies LayoutLoad;
