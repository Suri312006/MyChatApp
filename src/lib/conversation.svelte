<script lang="ts">
	import type { Tables } from '../../types/supabase.types';
	import User from './user.svelte';
	export let conversation: Tables<'conversations'>;
	export let curr_user_id;
	//maybe some sort of message id


	let user:Tables<"users"> ;

	//@ts-ignore
	if(conversation.user1.id == curr_user_id){
		//@ts-ignore
		user = conversation.user2
	} else {
		//@ts-ignore
		user = conversation.user1
	}


</script>

<main id="message">
	<a rel="external" href="/{conversation.id}">
		<User user={user} />
</a>
</main>
