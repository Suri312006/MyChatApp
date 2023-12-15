<script lang="ts">
	import type { Tables } from '../../types/supabase.types';
	export let user: Tables<'users'>;
	//maybe some sort of message id
	console.log(user.avatar_url)
</script>

<main id="message">
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
</main>
