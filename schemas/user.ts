import { Schema } from "mongoose";

const userSchema: Schema = new Schema({
    email: String,
    password: String,
    name: String,
    role: String
});

export default userSchema;