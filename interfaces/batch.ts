import { Types } from "mongoose";

interface IBatch {
    _id?: string;
    batchCode: string;
    students: Array<Types.ObjectId | string>;
}

export default IBatch;