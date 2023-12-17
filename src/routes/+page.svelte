
<script lang="ts">
import type { PageData } from './$types';
import Conversation from '$lib/conversation.svelte';
	export let data: PageData;
	
</script>

<main class="">
	<div id="contacts-list" class="flex justify-center items-center">
		<div id="lol" class=" container h-[100vh] p-2 overflow-auto">
			{#if data.conversations}
				<ul class="grid grid-flow-row auto-rows-max items-center justify-center gap-2">
					{#each data.conversations as conversation}
						<li>
							
						 <a href="/{conversation.id}">
								<Conversation curr_user_id={data.session?.user.id} conversation={conversation} />
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>

</main>

<style>
</style>
