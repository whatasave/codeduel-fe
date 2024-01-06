<script>
	import Button from '../components/button/Button.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Button onclick={() => console.log('ciao')}>
	{#snippet children()}{/snippet}
</Button>
<Button onclick={() => console.log('ciao')}>ciao</Button>
