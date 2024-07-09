import { initMongoose } from "$lib/mongoose/mongoose.server";

export async function handle({ event, resolve }) {
    initMongoose();

    return await resolve(event);
}
