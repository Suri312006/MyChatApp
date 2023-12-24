// src/routes/profile/+page.ts
import { redirect } from '@sveltejs/kit';
import type { Tables } from '../../types/supabase.types.js';
export const load = async ({ parent }) => {
	//* parent in this case just means its loading form the +layout.server.ts file
	//* https://kit.svelte.dev/docs/load#using-parent-data
	//* this data is coming from /src/routes/+layout.ts
	const { supabase, session } = await parent();
	if (!session) {
		throw redirect(303, '/welcome');
	}

	const { data: conversations } = await supabase
		.from('conversations')
		.select(`*, user1(*), user2(*)`)
		.or(`user1.eq.${session?.user.id}, user2.eq.${session?.user.id}`);

	const { data: friend_requests } = await supabase
		.from('friend_requests')
		.select(`*, to(*), from(*)`)
		.or(`to.eq.${session.user.id}, from.eq.${session.user.id}`);

	const { data: otherUsers } = await supabase.from('users').select().neq('id', session.user.id);

	//todo need to create outgoing friend requests

	const incoming_frs = friend_requests?.filter(
		//@ts-ignore
		(input) => input.to.id == session.user.id && !input.accepted
	);

	const outgoing_frs = friend_requests?.filter(
		//@ts-ignore
		(input) => input.from.id == session.user.id && !input.accepted
	);

	//todo need to create incoming friend requests
	return {
		conversations,
		otherUsers,
		incoming_frs,
		outgoing_frs
	};
};
