import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import batchModel from "../../../../models/batchModel";
import userModel from "../../../../models/userModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'PUT':
            const student = await userModel.findOne({ _id: req.query.studentId });
            const batch = await batchModel.findOneAndUpdate(
                { _id: req.query.id },
                { $push: { students: student } }
            );
            if (batch === null || student === null) {
                res.status(404);
            } else {
                const updatedBatch = { _id: req.query.id, ...req.body };
                res.json({ status: res.status, data: updatedBatch });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}