<script lang='ts'>
    export let name:string | null;
    export let id:string
    //maybe some sort of message id
</script>


<main id='message'>
    <div class="flex">
        <ul>
            <li>{name}</li>
        </ul>
    </div>

</main>