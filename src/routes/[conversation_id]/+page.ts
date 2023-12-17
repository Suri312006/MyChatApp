import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { session, supabase } = await parent();

	//*i think we already have a sort of session checker, if not implement it into layout.ts

	//* remember that this returns an array of rows that match query
	const requested_conversation = await supabase
		.from('conversations')
		.select()
		.eq('id', params.conversation_id);
	
	console.log(requested_conversation)

    if ( (session?.user.id != requested_conversation.data![0].user1 ) && (session?.user.id != requested_conversation.data![0].user2)){
		throw error(401, { message: "Unauthorized to access conversation"

		})
	}
	
	const { data: prev_messages } = await supabase
		.from('messages')
		.select(`*, author(*), conversation_id(*)`)
		.eq('conversation_id', params.conversation_id);

	// should load messages related to the conversation
	return {
		prev_messages,
		conversation_id: params.conversation_id
	};
}) satisfies PageLoad;
