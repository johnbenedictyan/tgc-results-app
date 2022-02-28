import { Schema } from "mongoose";
import userSchema from "./user";

const batchSchema: Schema = new Schema({
    batchCode: String,
    students: [userSchema]
});

export default batchSchema;