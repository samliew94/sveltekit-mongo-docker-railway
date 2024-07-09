<script lang="ts">
    export let dialog: any;
</script>

<dialog
    bind:this={dialog}
    class="fixed inset-0 outline-none backdrop:bg-black/30"
>
    <div
        class="bg-black border p-4 flex flex-col justify-center items-center gap-4"
    >
        <slot></slot>
    </div>
</dialog>
