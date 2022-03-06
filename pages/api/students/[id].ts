import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import userModel from "../../../models/userModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    let student;

    await dbConnect();

    switch (method) {
        case 'GET':
            student = await userModel.findOne({ _id: req.query.id });
            if (student === null) {
                res.status(404);
            } else {
                res.json(student);
            }
            break;
        case 'PUT':
            student = await userModel.findOneAndUpdate({ _id: req.query.id }, req.body);
            if (student === null) {
                res.status(404);
            } else {
                const updatedStudent = { _id: req.query.id, ...req.body };
                res.json({ status: res.status, data: updatedStudent });
            }
            break;
        case 'DELETE':
            student = await userModel.findOneAndDelete({ _id: req.query.id });
            if (student === null) {
                res.status(404);
            } else {
                res.json({ NextApiResponse: "Student deleted Successfully" });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}