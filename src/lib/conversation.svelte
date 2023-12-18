<script lang="ts">
	import type { Tables } from '../../types/supabase.types';
	export let conversation: Tables<'conversations'>;
	export let curr_user_id;
	//maybe some sort of message id


	let user:any ;

	//@ts-ignore
	if(conversation.user1.id == curr_user_id){
		user = conversation.user2
	} else {
		user = conversation.user1
	}


</script>

<main id="message">
	<a href="/{conversation.id}">
	<div
		class="justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex items-center space-x-2 text-sm"
		id="radix-:r0:"
		aria-haspopup="menu"
		aria-expanded="false"
		data-state="closed"
	>
		<span class="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6">
			<img class="flex h-full w-full items-center justify-center rounded-full bg-muted" src={user.avatar_url} alt="user avatar">
		</span>
		<span>{user.full_name}</span>
	</div>
</a>
</main>
