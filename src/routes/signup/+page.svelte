<script lang="ts">
	export let data;
	// export let form: ActionData;
	console.log(data.session);
</script>

<main class="flex justify-center h-screen items-center">
	<div>
		<h1>looks like you might have an account!</h1>

		<h1>lets get you logged in bud!</h1>

		<form method="POST" action="?/signup">
			<input class="text-black" name="email" type="email" placeholder="Email" />
			<input class="text-black" name="password" type="password" placeholder="password" />

			<button> login</button>
		</form>

		<form method="POST">
			<button class="variant-filled btn-lg" formaction="?/login&provider=google"> Continue with Google</button>
		</form>
	</div>
</main>
