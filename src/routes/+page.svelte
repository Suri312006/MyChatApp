<script lang="ts">
	import type { PageData } from './$types';
	import Conversation from '$lib/conversation.svelte';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import FriendRequest from '$lib/friendRequest.svelte';

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
				//@ts-ignore
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

	const send_friend_request = async (to_id: string) => {
		//@ts-ignore
		const { error } = await data.supabase
			.from('friend_requets')
			.insert({ from: data.session?.user.id, to: to_id });
		if (error) {
			console.log(error);
		}
	};
</script>

<main class="flex">
	<div id="existing-convos" class="container basis-1/3 h-max border-2">
		<h1>Conversations</h1>
		{#if data.conversations}
			{#each data.conversations as conversation}
				<Conversation curr_user_id={data.session?.user.id} {conversation} />
			{/each}
		{/if}
	</div>
	<div id="fr's+allUsers" class="container basis-2/3 h-max border-2">
		<div class="flex">
			<div class="container basis-1/2 border-2">
				Pending Friend Requests
				{#if data.outgoing_frs}
					{#each data.outgoing_frs as fr}
						<FriendRequest supabase={data.supabase} friend_req={fr} />
					{/each}
				{/if}
			</div>
			<div class="container basis-1/2 border-2">
				Outgoing Friend Requests

				{#if data.incoming_frs}
					{#each data.incoming_frs as fr}
						<FriendRequest supabase={data.supabase} friend_req={fr} />
					{/each}
				{/if}
			</div>
		</div>
		<div>
			all users

			{#if data.otherUsers}
				{#each data.otherUsers as user}
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
					<button
						on:click|preventDefault={() => {
							send_friend_request(user.id);
						}}
					>
						<h1>add as a friend</h1>
					</button>
				{/each}
			{/if}
		</div>
	</div>
</main>

<!-- 
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
							<button on:click|preventDefault={()=>{send_friend_request(user.id)}}>
								<h1>add as a friend</h1>
							</button>
						</button>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</main> -->

<style>
</style>
