<script lang="ts">
	
    
    export let data;

	// export let form: ActionData;

    console.log(data.session)

</script>

<h1>looks like you might have an account!</h1>

<h1>lets get you logged in bud!</h1>

<form method="POST" action="?/signup">
	<input name="email" type="email" placeholder="Email"/>
	<input name="password" type="password" placeholder="password"  />

	<button> login</button>

</form>


<form method="POST">
    <button formaction="?/login&provider=google"> lihuliuh</button>

</form>