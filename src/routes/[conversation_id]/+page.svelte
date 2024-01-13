<script lang="ts">
	import type { PageData } from './$types';
	import Message from '$lib/message.svelte';
	import { onDestroy, onMount } from 'svelte';
//	import { invalidate, invalidateAll } from '$app/navigation';
	export let data: PageData;

		let container: HTMLDivElement;

		const scrollToBottom = () => {
  // Scroll to the bottom
  container.scrollTop = container.scrollHeight;
  // Use setTimeout to log values after the scroll operation
  setTimeout(() => {
//     console.log(container.scrollTop, container.scrollHeight);

     container.scrollTop = container.scrollHeight;
	 /* This way, the console.log statement will execute after the browser
	 has had a chance to update the scrollTop property to the new scrollHeight. 
	 The setTimeout with a delay of 0 milliseconds essentially schedules 
	 the callback to be executed in the next available event loop cycle, 
	 ensuring it's executed after the current execution context.*/

  }, 0);
 		};

	onMount(() => {
		scrollToBottom();
	});

	let all_messages = Array.from(data.prev_messages!);
	//* ENABLED REALTIME FILTER HOLY MOLY ITS SO FINEEEEE

	let new_messages_channel = data.supabase
		.channel('messages_channel')
		.on(
			'postgres_changes',
			{
				event: 'INSERT',
				schema: 'public',
				table: 'messages',
				filter: 'conversation_id=eq.' + data.conversation_id
			},
			async (payload) => {
				let new_message = await data.supabase
					.from('messages')
					.select('*, author(*)')
					.eq('id', payload.new.id);

				// @ts-ignore
				all_messages = [...all_messages, ...new_message.data]; // Update all_messages array

				scrollToBottom();
				console.log('called?');
			}
		)
		.subscribe((status) => {
			console.log(status);
		});

	onDestroy(() => {
		data.supabase.removeChannel(new_messages_channel);
	});

	let new_message_text: string;
	export const send_message = async () => {
		const { error } = await data.supabase.from('messages').insert({
			author: data.session?.user.id,
			conversation_id: data.conversation_id,
			body: new_message_text
		});
		new_message_text = '';
	};

</script>

<main>
	<div
		bind:this={container}
		id="messages-view"
		class="container flex-col justify-end overflow-auto h-[50vh] bg-black rounded-xl"
	>
		{#if all_messages}
			{#each all_messages as message}
				{#if data.session}
					<Message curr_user_id={data.session.user.id} {message} />
				{/if}
			{/each}
		{/if}
	</div>
	<div class="h-[10vh]" id="input">
		<form on:submit|preventDefault={send_message}>
			<input name="message" type="text" bind:value={new_message_text} class="w-full text-black" />
			<button> send </button>
		</form>
	</div>
</main>
