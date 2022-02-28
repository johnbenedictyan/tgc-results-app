import IUser from "./user";

interface IBatch {
    batchCode: string;
    students: Array<IUser>;
}

export default IBatch;