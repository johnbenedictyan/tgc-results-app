import { model, models } from "mongoose";
import ISubmission from "../interfaces/submission";
import submissionSchema from "../schemas/submission";

export default models.Submission || model<ISubmission>("Submission", submissionSchema);