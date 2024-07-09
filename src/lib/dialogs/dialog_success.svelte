<script lang="ts">
    export let callback: () => void;
</script>

<h1>success</h1>
<button class="btn-primary" on:click={() => callback()}>ok</button>
