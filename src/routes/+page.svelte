<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	console.log(data.tableData);

	let countries: any[] = [];
	// for each loop!
	data.tableData?.forEach((thing) => {
		console.log(thing);
		countries.push(thing);
	});
</script>

<main class="flex justify-center items-center ">
	<div id="contacts-list" class="basis-1/4">
		<div id="lol" class=" container h-[100vh] p-2 overflow-auto">
			{#each countries as country}
				<div class="w-full variant-filled-primary bg-gray-50 border border-spacing-1">
					<h1>
						{country.name}
					</h1>
				</div>
			{/each}
		</div>
	</div>
	<div id="messages-input" class="basis-3/4">
		<div class="h-[90vh]" id="messages"></div>
		<div class="h-[10vh]" id="input">
			<form>
				<input name="message" type="text" class="w-full text-black" />
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
