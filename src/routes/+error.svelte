<script>
    import { page } from "$app/stores";
</script>

<div class="flex flex-col justify-center items-center h-full gap-4">
    <h1>WHOOPS!</h1>
    <h2>{$page?.error?.message}</h2>
</div>
