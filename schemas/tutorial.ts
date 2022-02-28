import { Schema } from "mongoose";

const tutorialSchema: Schema = new Schema({
    group: String,
    title: String,
    order: Number,
    tutorialCode: String,
    questionCodes: [String]
});

export default tutorialSchema;