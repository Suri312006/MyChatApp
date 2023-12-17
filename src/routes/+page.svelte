<script lang="ts">
	import type { PageData } from './$types';
	import Conversation from '$lib/conversation.svelte';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	export let data: PageData;

	const get_or_create_convo = async (req_user: string) => {
		//want to get a conversation id if it exits

		//never mind this is an even sexier call dude holy shit
		const existing_convo = await data.supabase
			.from('conversations')
			.select(`*, user1(*), user2(*)`)
			.or(
				`and(user1.eq.${data.session?.user.id},user2.eq.${req_user}), and(user2.eq.${data.session?.user.id},user1.eq.${req_user})`
			);

		if (existing_convo.data!.length == 0) {
			//we need to create a new conversation
			//@ts-ignore
			const conversation = await data.supabase
				.from('conversations')
				.insert({ user1: data.session?.user.id, user2: req_user })
				.select();
			if (conversation.error) {
				console.log(conversation);
				throw Error('could not create new conversation, sorry!');
			} else {
				goto(`/${conversation.data![0].id}`);
			}
		}
		goto(`/${existing_convo.data![0].id}`);
	};
</script>

<main class="">
	<div id="contacts-list" class="flex justify-center items-center">
		<div id="lol" class=" container h-[100vh] p-2 overflow-auto">
			{#if data.otherUsers}
				<ul class="grid grid-flow-row auto-rows-max items-center justify-center gap-2">
					{#each data.otherUsers as user}
						<button
							on:click|preventDefault={async () => {
								get_or_create_convo(user.id);
							}}
						>
							<div
								class="justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex items-center space-x-2 text-sm"
								id="radix-:r0:"
								aria-haspopup="menu"
								aria-expanded="false"
								data-state="closed"
							>
								<span class="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6">
									<img
										class="flex h-full w-full items-center justify-center rounded-full bg-muted"
										src={user.avatar_url}
										alt="user avatar"
									/>
								</span>
								<span>{user.full_name}</span>
							</div>
						</button>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</main>

<style>
</style>
