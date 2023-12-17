<script lang="ts">
	import type { Tables } from '../../types/supabase.types';
	import { AppBar, Avatar } from '@skeletonlabs/skeleton';
	//needs to be data from the db
	export let logged_in_user: Tables<'users'>;
</script>

<main>
	<AppBar>
		<svelte:fragment slot="lead">
			<a href="/">
				<h1
					class="text-5xl pb-5 h-max font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 bg-300% text-transparent bg-clip-text animate-gradient"
				>
					Zing    
				</h1>
			</a>
		</svelte:fragment>
		<div class="flex justify-end px-12 items-center">
			<input type="text" class="rounded-xl text-black" placeholder="Search user..." />
		</div>
		<svelte:fragment slot="trail">
			{#if logged_in_user.avatar_url}
				<a href="/me">
					<Avatar src={logged_in_user?.avatar_url}></Avatar>
				</a>
			{/if}
		</svelte:fragment>
	</AppBar>
</main>

<style>
	.animate-gradient {
		background-size: 300%;
		-webkit-animation: animatedgradient 6s ease infinite alternate;
		-moz-animation: animatedgradient 6s ease infinite alternate;
		animation: animatedgradient 6s ease infinite alternate;
	}

	@keyframes animatedgradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
