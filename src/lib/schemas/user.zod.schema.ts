import { z } from "zod";

export default z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(8, { message: "Name must be less than 8 characters" })
        .transform((val) => val.toUpperCase().trim()),
    password: z.string().min(1, { message: "Password is required" }),
});
