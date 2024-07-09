<script>
    import { goto } from "$app/navigation";
</script>

<div class="h-full flex justify-center items-center">
    <div class="flex flex-col gap-4 justify-center items-center border p-4">
        <h1>Hi</h1>
        <h2 class="text-center">
            I am built with <br />SvelteKit & Docker
        </h2>
        <button class="btn-primary" on:click={() => goto("/test")}
            >click me
        </button>
        <p class="italic">you will be redirected to /test</p>
    </div>
</div>
