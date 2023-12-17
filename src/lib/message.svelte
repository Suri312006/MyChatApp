<script lang="ts">
	import type { Tables } from '../../types/supabase.types';

	export let curr_user_id: string;
	export let message: any;


</script>

<main id="message">
	<div class="p-4">
		{#if message.author.id == curr_user_id}
			<div class="flex justify-end items-end gap-4">
				<div class="flex items-start gap-4">
					<div class="flex flex-col">
						<div class="bg-gray-200 dark:bg-gray-500 rounded-xl p-3">
							<p class="text-gray-800 dark:text-gray-200">{message.body}</p>
						</div>
						<p class="text-right text-xs text-gray-500 mt-1">{message.created_at}</p>
					</div>
					<span class="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
						<img
							class="flex h-full w-full items-center justify-center rounded-full bg-muted"
							src={message.author.avatar_url}
							alt={'avatar'}
						/>
					</span>
				</div>
			</div>
		{:else}
			<div class="flex items-start gap-4">
				<span class="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
					<img
						class="flex h-full w-full items-center justify-center rounded-full bg-muted"
						src={message.author.avatar_url}
						alt={'avatar'}
					/>
				</span>
				<div class="flex flex-col">
					<div class="bg-gray-200 dark:bg-gray-500 rounded-xl p-3">
						<p class="text-gray-800 dark:text-gray-200">{message.body}</p>
					</div>
					<p class="text-right text-xs text-gray-500 mt-1">{message.created_at}</p>
				</div>
			</div>
		{/if}
	</div>
</main>
