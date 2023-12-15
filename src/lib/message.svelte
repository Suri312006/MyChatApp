<script lang='ts'>
import type { Tables } from '../../types/supabase.types';

    export let curr_user:Tables<"users">;
    export let message:Tables<"messages">

    //maybe some sort of message id

</script>


<main id='message'>
    <div class="p-4">
        <div class="flex items-start gap-4">
          <span class="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
            <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">UA</span>
          </span>
          <div class="flex flex-col">
            <div class="bg-gray-200 dark:bg-gray-500 rounded-xl p-3">
              <p class="text-gray-800 dark:text-gray-200">This is a placeholder message text.</p>
            </div>
            <p class="text-right text-xs text-gray-500 mt-1">Sent at 4:05 PM</p>
          </div>
        </div>
      </div>
</main>