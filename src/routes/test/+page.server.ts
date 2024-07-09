import userZodSchema from "$lib/schemas/user.zod.schema";
import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

// Define outside the load function so the adapter can be cached
export const load = async ({ fetch }) => {
    const usersRes = await fetch("/api/users");

    const { users } = await usersRes.json();

    const form = await superValidate(zod(userZodSchema));
    return { form, users };
};

export const actions = {
    default: async ({ request, fetch }) => {
        await new Promise((r) => setTimeout(r, 500));

        const form = await superValidate(request, zod(userZodSchema));

        if (!form.valid) {
            // Again, return { form } and things will just work.
            return fail(400, { form });
        }

        // Do something with the form data
        const res = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify(form.data),
        });

        if (!res.ok) {
            const error = await res.text();
            return message(form, {
                error,
                status: 400,
            });
        }

        // Display a success status message
        return message(form, { status: 200 });
    },
};
