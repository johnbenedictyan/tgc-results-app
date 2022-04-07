import { NextApiRequest, NextApiResponse } from "next";
import IUser from "../../../interfaces/user";
import adminHandler from "../../../lib/adminHandler";
import dbConnect from "../../../lib/dbConnect";
import batchModel from "../../../models/batchModel";
import submissionModel from "../../../models/submissionModel";
import userModel from "../../../models/userModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    adminHandler(req, res);

    let student: IUser | null;

    await dbConnect();

    switch (method) {
        case 'GET':
            student = await userModel.findOne({ _id: req.query.id });
            if (student === null) {
                return res.status(404);
            } else {
                return res.json(student);
            }
        case 'PUT':
            student = await userModel.findOneAndUpdate({ _id: req.query.id }, req.body);
            if (student === null) {
                return res.status(404);
            } else {
                const updatedStudent = { _id: req.query.id, ...req.body };
                return res.json({ status: res.status, data: updatedStudent });
            }
        case 'DELETE':
            student = await userModel.findOneAndDelete({ _id: req.query.id });
            if (student === null) {
                return res.status(404);
            } else {
                submissionModel.deleteMany({ email: student.email }).exec();
                batchModel.updateMany({
                    'students._id': {
                        $in: student._id
                    }
                }, {
                    $pull: {
                        'students': {
                            _id: student._id
                        }
                    }
                });
                return res.json({ NextApiResponse: "Student deleted Successfully" });
            }
        default:
            return res.json({ status: 400, success: false });
    }
}