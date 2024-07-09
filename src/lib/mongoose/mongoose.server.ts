import { MONGO_URI } from "$env/static/private";
import mongoose from "mongoose";
const { ConnectionStates } = mongoose;

export async function initMongoose() {
    if (mongoose.connection.readyState === ConnectionStates.connected) {
        return;
    }

    console.log("connecting to mongodb at", MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log("connected to mongodb at", MONGO_URI);
}
