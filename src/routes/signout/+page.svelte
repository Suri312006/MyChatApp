<script>
	import { goto } from '$app/navigation';

    export let data;

</script>

<main>
    {#if data.success}
        logout Success!!


        <button class="btn" on:click={ ()=>{ goto('/') } }>

            goback!

        </button>
    {/if}
</main>