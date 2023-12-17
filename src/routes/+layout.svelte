<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, AppShell, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	import Header  from '$lib/header.svelte';

	export let data;
</script>

<main class=' '>
	<!-- <div class=' lg:flex-grow '> -->

	<AppShell>
		<!-- <AppShell class='lg:backdrop-blur lg:backdrop-brightness-100'> -->
		<!-- <AppShell class='lg:backdrop-blur lg:backdrop-brightness-100 lg:border lg:border-l-0 lg:border-r-0 lg:border-primary-600'> -->

	<svelte:fragment slot="header"><Header logged_in_user={data.logged_in_user} /></svelte:fragment>
	<!-- (sidebarLeft) -->

	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot/>
	<!-- ---- / ---- -->
</AppShell>
</main>
