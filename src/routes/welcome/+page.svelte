<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

</script>

<main class="flex justify-center items-center">
	<div class="flex text-center justify-center items-center h-screen">
		<ul>
			<li>
				<h1 class="text-7xl">Welcome to</h1>
			</li>
			<li>
				<h1 class="text-9xl pb-5 h-max font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 bg-300% text-transparent bg-clip-text animate-gradient">
					Zing
				</h1>
			</li>
		</ul>
	</div>
</main>

<style>
	.animate-gradient {
  background-size: 300%;
  -webkit-animation: animatedgradient 6s ease infinite alternate;
  -moz-animation: animatedgradient 6s ease infinite alternate;
  animation: animatedgradient 6s ease infinite alternate;
}

@keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>