import { NextApiRequest, NextApiResponse } from "next";
import ISubmission from "../../../interfaces/submission";
import adminHandler from "../../../lib/adminHandler";
import dbConnect from "../../../lib/dbConnect";
import submissionModel from "../../../models/submissionModel";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    let submission: ISubmission | null;

    adminHandler(req, res);

    await dbConnect();

    switch (method) {
        case 'GET':
            submission = await submissionModel.findOne({ _id: req.query.id });
            if (submission === null) {
                return res.status(404);
            } else {
                return res.json(submission);
            }
        case 'PUT':
            submission = await submissionModel.findOneAndUpdate({ _id: req.query.id }, req.body);
            if (submission === null) {
                return res.status(404);
            } else {
                const updatedSubmission = { _id: req.query.id, ...req.body };
                return res.json({ status: res.status, data: updatedSubmission });
            }
        case 'DELETE':
            submission = await submissionModel.findOneAndDelete({ _id: req.query.id });
            if (submission === null) {
                return res.status(404);
            } else {
                return res.json({ NextApiResponse: "Submission deleted Successfully" });
            }
        default:
            return res.json({ status: 400, success: false });
    }
}