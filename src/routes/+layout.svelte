<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, AppShell, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	import Header  from '$lib/header.svelte';
	import { onMount } from 'svelte';
	import type { Tables } from '../../types/supabase.types';

	export let data;
	let showHeader = false;

	let logged_in_user:Tables<'users'>;

	onMount(async()=>{
		if (data.session?.user.aud == "authenticated") {
		let temp = await data.supabase.from('users').select().eq("id", data.session?.user.id)
		logged_in_user = temp.data![0]
		showHeader = true
			
	}
	})


</script>

<main class=' '>
	<!-- <div class=' lg:flex-grow '> -->
	{#if showHeader}
	<AppShell>
		<!-- <AppShell class='lg:backdrop-blur lg:backdrop-brightness-100'> -->
		<!-- <AppShell class='lg:backdrop-blur lg:backdrop-brightness-100 lg:border lg:border-l-0 lg:border-r-0 lg:border-primary-600'> -->

	<svelte:fragment slot="header"><Header logged_in_user={logged_in_user} /></svelte:fragment>
	<!-- (sidebarLeft) -->

	<!-- (pageHeader) -->	
	<!-- Router Slot -->
	<slot/>
	<!-- ---- / ---- -->
</AppShell>
{:else}
<slot/>
{/if}
</main>
