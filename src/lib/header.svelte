<script lang='ts'>
    import type {Tables} from '../../types/supabase.types'
    //needs to be data from the db
    export let logged_in_user:Tables<"users">;


</script>

<main>
   header!!
   <h1>{logged_in_user.full_name}</h1>
</main>