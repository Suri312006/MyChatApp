<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { UUID } from 'crypto';
	import Message from '$lib/message.svelte';
	import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
	import Conversation from '$lib/conversation.svelte';

	export let data: PageData;
	//want ths to be reactive

	let curr_conversation_id = 'fd171c51-c397-45b5-bce7-7bd0456ec3ae';

	let new_message_text: string = '';

	let prev_messages: any;

	$: messages_channel = data.supabase
		.channel('messages_channel')
		.on(
			'postgres_changes',
			{
				event: 'INSERT',
				schema: 'public',
				table: 'messages'
			},
			(payload) => {
				console.log('payload new', payload.new);
				console.log('payload old', payload.old);
				console.log('payload eventType', payload.eventType);
			}
		)
		.subscribe((status) => {
			console.log(status);
		});

	console.log(data.userData);

	//! i dont think this is the right way to do this

	export const switch_conversation = async (id: string) => {
		//create conversation if it doesnt exist already

		const myID = data.session?.user.id;
		const otherID = id;

		let arr1 = await data.supabase
			.from('conversations')
			.select()
			.eq('user1', myID!)
			.eq('user2', otherID!);
		let arr2 = await data.supabase
			.from('conversations')
			.select()
			.eq('user2', myID!)
			.eq('user1', otherID!);

		console.log('arr1', arr1);
		console.log('arr2', arr2);

		if (arr1.data!.length == 0 && arr2.data!.length == 0) {
			console.log('creating new conversation');
			const { error } = await data.supabase
				.from('conversations')
				.insert({ user1: myID, user2: otherID });

			let new_conversation = await data.supabase
				.from('conversations')
				.select()
				.eq('user1', myID!)
				.eq('user2', otherID!);

			curr_conversation_id = new_conversation.data![0].id;

			prev_messages = await data.supabase
				.from('messages')
				.select()
				.eq('conversation_id', curr_conversation_id);

			return;
		} else {
			let conversation;
			if (arr1.data != null) {
				conversation = arr1.data[0];
			} else if (arr2.data != null) {
				conversation = arr2.data[0];
			} else {
				throw new Error('something went wrong switching conversations');
			}

			console.log(conversation);

			console.log('conversation exists, grabbing messages!');
			curr_conversation_id = conversation.id;

			prev_messages = await data.supabase
				.from('messages')
				.select()
				.eq('conversation_id', curr_conversation_id);
			prev_messages = await data.supabase
				.from('messages')
				.select()
				.eq('conversation_id', conversation!.id);
			return;
		}
	};

	export const send_message = async () => {
		const { error } = await data.supabase.from('messages').insert({
			author: data.session?.user.id,
			conversation_id: curr_conversation_id,
			body: new_message_text
		});
		console.log(error);
		new_message_text = '';
	};
</script>

<main class="flex justify-center items-center">
	<div id="contacts-list" class="basis-1/4">
		<div id="lol" class=" container h-[100vh] p-2 overflow-auto">
			{#if data.otherUsers}
				<ul class="grid grid-flow-row auto-rows-max items-center justify-center gap-2">
					{#each data.otherUsers as user}
						<li>
							<button
								on:click={() => {
									switch_conversation(user.id);
								}}
							>
								<Conversation {user} />
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
	<div id="messages" class="basis-3/4">
		<div id="messages-view" class="h-[90vh] bg-black rounded-xl">
			{#if prev_messages}
				{#each prev_messages.data as message}
					{#if data.session}
						<Message curr_user_id={data.session.user.id} {message} />
					{/if}
				{/each}
			{/if}
		</div>
		<div class="h-[10vh]" id="input">
			<form>
				<input name="message" type="text" bind:value={new_message_text} class="w-full text-black" />
				<button on:click={send_message}> send </button>
			</form>
		</div>
	</div>
</main>

<style>
</style>
