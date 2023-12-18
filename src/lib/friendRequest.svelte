<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Database } from '../../types/supabase.types';
	import User from './user.svelte';
	import Conversation from './conversation.svelte';
	export let supabase: SupabaseClient;
	//todo figure out query types!!
	// export let friend_req: Tables<'friend_requests'>
	export let friend_req: any;

	export let curr_user_id: string;

    console.log("friend_req", friend_req)
	const accept_fr = async () => {
		const response = await supabase
			.from('friend_requests')
			.update({ accepted: true })
			.eq('id', friend_req.id)
			.select();  
        if(response.status == 200){
            const new_convo = await supabase.from("conversations").insert({user1: friend_req.from.id, user2: friend_req.to.id })
            
        } else {
            console.log(response)
        }

	};

	const decline_fr = async () => {};
</script>

<main>
	{#if friend_req.to.id == curr_user_id}
		<User user={friend_req.from} />

		<button
			on:click|preventDefault={async () => {
				console.log('pressed');
				await accept_fr();
			}}
			type="button"
			class="btn variant-filled-success"
		>
			accept
		</button>

		<button
			on:submit|preventDefault={async () => {
				await decline_fr();
			}}
			type="button"
			class="btn variant-filled-error"
		>
			decline
		</button>
	{/if}

	{#if friend_req.from.id == curr_user_id}
		<User user={friend_req.to} />
	{/if}
</main>
