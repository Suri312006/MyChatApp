<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { UUID } from 'crypto';
	import Message from '$lib/message.svelte';
	import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';

	export let data: PageData;
	let messages;

	console.log(data.userData);

	//! i dont think this is the right way to do this

	let selected_user: typeof data.userData;

	const select_user_to_message = async (id: string) => {
		//create conversation if it doesnt exist already


		const myID = data.session?.user.id;
		const otherID = id;

		let arr1 = await data.supabase.from('conversations').select().eq('user1', myID!);
		let arr2 = await data.supabase.from('conversations').select().eq('user2', myID!);

		// conversations that only currently logged in user is participating in
		let conversations = arr1.data?.concat(arr2.data!)
		
		
		//* okay wow that is dumb behavior, do not use forEach loops on async objects lmfao
		for ( const conversation of conversations!) {
			if (
				(conversation.user1 == myID || conversation.user2 == myID) &&
				(conversation.user2 == myID || conversation.user1 == otherID)
			) {
				// conversation exists, should return messages related to said conversation
				console.log('conversation exists, fetching messages')
				messages = await data.supabase.from('messages').select().eq('conversation_id', conversation.id);
				return null
			}
		}
		

		console.log("creating new conversation")
		//conversation does not exist atp
		const { error } = await data.supabase
			.from('conversations')
			.insert({ user1: myID, user2: otherID });


		return
		//creating conversation
		console.log(conversations);
	};
</script>

<main class="flex justify-center items-center">
	<div id="contacts-list" class="basis-1/4">
		<div id="lol" class=" container h-[100vh] p-2 overflow-auto">
			{#if data.allUsers}
				<ul>
					{#each data.allUsers as user}
						<li>
							<button
								on:click={() => {
									select_user_to_message(user.id);
								}}
							>
								<div class="w-full variant-filled-primary bg-gray-50 border border-spacing-1">
									<h1>
										{user.full_name}
									</h1>
								</div>
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
	<div id="messages" class="basis-3/4">
		<div id="messages-view" class="h-[90vh] bg-black rounded-xl">
			<Message user_name="lol" text="lol" time="right now mlmao" />
		</div>
		<div class="h-[10vh]" id="input">
			<form>
				<input name="message" type="text" class="w-full text-black" />
			</form>
		</div>
	</div>
</main>

<style>
</style>
