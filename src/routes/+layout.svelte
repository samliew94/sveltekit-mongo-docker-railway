<script lang="ts">
    import DialogFailed from "$lib/dialogs/dialog_failed.svelte";
    import DialogLoading from "$lib/dialogs/dialog_loading.svelte";
    import DialogSuccess from "$lib/dialogs/dialog_success.svelte";
    import DialogTemplate from "$lib/dialogs/dialog_template.svelte";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
    import "../app.css";

    let dialogLoading: any;
    let dialogSuccess: any;
    const dialogSuccessCallback = writable(() => {});
    let dialogFailed: any;
    const dialogFailedStore = writable({
        error: "",
        callback: () => {},
    });

    setContext("dialogLoading", {
        showModal: () => dialogLoading?.showModal(),
        close: () => dialogLoading?.close(),
    });
    setContext("dialogSuccess", {
        showModal: () => dialogSuccess?.showModal(),
        close: () => dialogSuccess?.close(),
        setCallback: (cb: () => void) => dialogSuccessCallback.set(cb),
    });
    setContext("dialogFailed", {
        showModal: () => dialogFailed?.showModal(),
        close: () => dialogFailed?.close(),
        setStore: (error: string, callback: () => void) =>
            dialogFailedStore.set({ error, callback }),
    });
</script>

<DialogTemplate bind:dialog={dialogLoading}>
    <DialogLoading />
</DialogTemplate>
<DialogTemplate bind:dialog={dialogSuccess}>
    <DialogSuccess callback={() => $dialogSuccessCallback()} />
</DialogTemplate>
<DialogTemplate bind:dialog={dialogFailed}>
    <DialogFailed
        error={$dialogFailedStore.error}
        callback={() => $dialogFailedStore.callback()}
    />
</DialogTemplate>

<div class="h-screen">
    <slot />
</div>
