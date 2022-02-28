import { Schema } from "mongoose";

const submissionSchema: Schema = new Schema({
    questionCode: String,
    batchCode: String,
    tutorialCode: String,
    result: String,
    dateTime: String,
    email: String
});

export default submissionSchema;