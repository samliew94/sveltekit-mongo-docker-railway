import userModel from "$lib/models/user.model";

export async function mongoFindAllUsers(searchInput: string) {
    try {
        const pipeline: any = [];

        if (searchInput) {
            pipeline.push({
                $match: {
                    $or: [
                        {
                            name: {
                                $regex: searchInput,
                                $options: "i",
                            },
                        },
                    ],
                },
            });
        }

        pipeline.push(
            {
                $sort: {
                    updatedAt: -1,
                },
            },
            {
                $limit: 10,
            },
            {
                $project: {
                    name: 1,
                    createdAt: 1,
                },
            }
        );

        return await userModel.aggregate(pipeline).exec();
    } catch (error) {
        throw error;
    }
}

export async function mongoAddUser(json: any) {
    try {
        const count = await mongoCountUser();
        if (count >= 10) {
            throw new Error("too many users! try deleting one!");
        }

        const { name, password } = json;

        const exists = await userModel.exists({ name });

        if (exists) {
            throw new Error("user already exists!");
        }

        return await userModel.create({ name, password });
    } catch (error) {
        throw error;
    }
}

export async function mongoDeleteUser(name: any) {
    try {
        const exists = await userModel.exists({ name });

        if (!exists) {
            throw new Error("user does not exists!");
        }

        await userModel.deleteOne({ name });
    } catch (error) {
        throw error;
    }
}

export async function mongoCountUser() {
    try {
        return await userModel.countDocuments();
    } catch (error) {
        throw error;
    }
}
