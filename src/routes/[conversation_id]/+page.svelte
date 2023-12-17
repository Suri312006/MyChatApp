<script lang="ts">
    import type { PageData } from './$types';
    import Message from '$lib/message.svelte';
    export let data: PageData;

    let new_message_text:string;
    export const send_message = async () => {
		const { error } = await data.supabase.from('messages').insert({
			author: data.session?.user.id,
			conversation_id: data.conversation_id,
			body: new_message_text
		});
		console.log(error);
		new_message_text = '';
	};

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

        
</script>

<main>
    <div id="messages-view" class="container flex-col justify-end overflow-auto h-[50vh] bg-black rounded-xl">
        {#if data.prev_messages}
            {#each data.prev_messages as message}
                {#if data.session}
                    <Message curr_user_id={data.session.user.id} message={message} />
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