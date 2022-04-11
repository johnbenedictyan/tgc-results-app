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
                res.status(404);
            } else {
                res.json(submission);
            }
            break;
        case 'PUT':
            submission = await submissionModel.findOneAndUpdate({ _id: req.query.id }, req.body);
            if (submission === null) {
                res.status(404);
            } else {
                const updatedSubmission = { _id: req.query.id, ...req.body };
                res.json({ status: res.status, data: updatedSubmission });
            }
            break;
        case 'DELETE':
            submission = await submissionModel.findOneAndDelete({ _id: req.query.id });
            if (submission === null) {
                res.status(404);
            } else {
                res.json({ NextApiResponse: "Submission deleted Successfully" });
            }
            break;
        default:
            res.json({ status: 400, success: false });
            break;
    }
}