<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	console.log(data.supabase)


	// onMount(() => {
	// 	if (data.session == null) {
	// 		//* need to call goto inside of onMount because of ssr lol which is really cool
	// 		goto('/welcome');
	// 	}
	// });
</script>

<main class="flex justify-center items-center">
<div id="contacts-list" class="basis-1/4">
hi
</div>
<div id="messages-input" class="basis-3/4">
	<div class="h-[90vh]" id="messages">

	</div>
	<div class="h-[10vh]" id="input">
		<form>
			<input name='message' type="text" class="w-full text-black">
		</form>
	</div>
	
</div>
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
