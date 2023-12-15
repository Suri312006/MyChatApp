<script lang='ts'>

    export let user_name:string;
    export let text:string;
    export let time:string;

    //maybe some sort of message id

</script>


<main id='message'>

    <div class="flex">
        <ul>
            <li>{user_name}</li>
            <li>{text}</li>
            <li>{time}</li>
        </ul>
    </div>


</main>