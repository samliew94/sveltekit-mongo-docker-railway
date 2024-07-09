<script lang="ts">
    export let callback: () => void;
    export let error = "";
</script>

<h1>failed</h1>
<p class="text-error text-4xl font-[400] uppercase">{error}</p>
<button class="btn-primary" on:click={() => callback()}>close</button>
