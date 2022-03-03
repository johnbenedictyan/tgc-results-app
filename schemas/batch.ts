import { Schema } from "mongoose";
import userSchema from "./user";

const batchSchema: Schema = new Schema({
    batchCode: String,
    students: [
        {type: Schema.Types.ObjectId, ref: 'User'}
    ]
});

export default batchSchema;