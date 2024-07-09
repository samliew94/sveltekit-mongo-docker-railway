import {
    mongoAddUser,
    mongoDeleteUser,
    mongoFindAllUsers,
} from "$lib/repo/user.repo";

export async function GET({ url }) {
    try {
        const searchInput = url?.searchParams.get("searchInput") || "";

        const users = await mongoFindAllUsers(searchInput);

        return new Response(JSON.stringify({ users }));
    } catch (error) {
        return new Response(JSON.stringify({ users: [] }));
    }
}

export async function POST({ request }) {
    try {
        const json = await request.json();

        await mongoAddUser(json);

        return new Response();
    } catch (error: any) {
        return new Response(error?.message, { status: 400 });
    }
}
export async function DELETE({ request }) {
    try {
        const { name } = await request.json();
        console.log("DELETE USER", name);

        await mongoDeleteUser(name);

        return new Response();
    } catch (error: any) {
        return new Response(error?.message, { status: 400 });
    }
}
