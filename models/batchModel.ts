import { model, models } from 'mongoose';
import IBatch from "../interfaces/batch";
import batchSchema from "../schemas/batch";

export default models.Batch || model<IBatch>("Batch", batchSchema);