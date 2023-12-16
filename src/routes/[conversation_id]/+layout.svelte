<script lang="ts">
	import Conversation from '$lib/conversation.svelte';
    import type { LayoutData } from './$types';
    
    export let data: LayoutData;
</script>
<main class="flex justify-center items-center">
<div id="contacts-list" class="basis-1/4">
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
<div class="basis-3/4">
<slot id='conversation' />
</div>
</main>