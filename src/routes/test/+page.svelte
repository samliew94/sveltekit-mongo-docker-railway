<script lang="ts">
    import { goto } from "$app/navigation";
    import { getContext } from "svelte";
    import { superForm } from "sveltekit-superforms";
    export let data;

    const dialogSuccess: any = getContext("dialogSuccess");
    const dialogFailed: any = getContext("dialogFailed");

    const { form, errors, message, enhance, delayed } = superForm(data.form, {
        resetForm: false,
    });
    const dialogLoading: any = getContext("dialogLoading");

    $: if ($delayed) {
        dialogLoading?.showModal();
    } else {
        dialogLoading?.close();
    }

    $: if ($message?.status === 200) {
        dialogSuccess?.setCallback(() => {
            dialogSuccess?.close();
        });
        dialogSuccess?.showModal();
    } else if ($message?.status === 400) {
        dialogFailed?.setStore($message?.error, () => {
            dialogFailed?.close();
        });
        dialogFailed?.showModal();
    }

    async function handleDelete(name: string) {
        try {
            const res = await fetch("/api/users", {
                method: "DELETE",
                body: JSON.stringify({ name }),
            });

            if (!res.ok) {
                throw new Error(await res.text());
            }

            dialogSuccess?.setCallback(() => {
                dialogSuccess?.close();
                goto("/test", {
                    invalidateAll: true,
                });
            });
            dialogSuccess?.showModal();
        } catch (error: any) {
            dialogFailed?.setStore($message?.error, () => {
                dialogFailed?.close();
            });
            dialogFailed?.showModal();
        }
    }
</script>

<div class="grid justify-center items-center h-full p-4">
    <div class="border">
        <div class="grid sm:grid-cols-2 gap-4 divide-x-2 p-4">
            <div class="flex flex-col gap-4">
                <h1 class="underline underline-offset-8">
                    Users DB <span class="text-sm italic">(max 10)</span>
                </h1>
                <div class="grid grid-cols-3 gap-2 justify-center items-center">
                    <h2>Name</h2>
                    <h2>Created At</h2>
                    <h2 class="text-center">Delete</h2>
                    {#each data?.users as user, i}
                        <p>{i + 1}. {user.name}</p>
                        <p>{user?.createdAt}</p>
                        <div class="text-center">
                            <button
                                type="button"
                                on:click={() => handleDelete(user.name)}
                                class="btn-delete">DELETE</button
                            >
                        </div>
                    {/each}
                </div>
            </div>
            <div class="p-4">
                <p class="italic text-center">
                    On submit, there's an intentional delay to show the loading
                    progress circle in action.
                </p>
                <form
                    method="POST"
                    class="flex flex-col justify-center items-center h-full gap-8 p-2"
                    use:enhance
                >
                    <label for="name">
                        {#if $errors?.name}
                            <p class="text-error">{$errors.name[0]}</p>
                        {/if}
                        <p class="p-label">Name</p>
                        <input
                            autocomplete="name"
                            name="name"
                            class="uppercase"
                            bind:value={$form.name}
                        />
                    </label>

                    <label>
                        {#if $errors?.password}
                            <p class="text-error">{$errors.password[0]}</p>
                        {/if}
                        <p class="p-label">Password</p>
                        <input
                            type="password"
                            name="password"
                            autocomplete="current-password"
                            bind:value={$form.password}
                        />
                    </label>
                    <button class="btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>
