import mongoose from "mongoose";

export default mongoose.model(
    "users",
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
        },
        { timestamps: true }
    )
);
