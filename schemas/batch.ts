import { Schema, Types } from "mongoose";


const batchSchema: Schema = new Schema({
    batchCode: {
        type: String,
        unique: true
    },
    students: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ]
});


batchSchema.statics.findBatchesByStudentId = function (studentId: Types.ObjectId) {
    return this.find({ students: studentId });
}

batchSchema.statics.findByBatchCode = function (batchCode: string) {
    return this.findOne({ batchCode })
}

export default batchSchema;