import { NextApiRequest, NextApiResponse } from "next";
import { SubmissionController } from "../../../controllers/submissionController";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    const submissionController = new SubmissionController();

    await dbConnect();

    switch (method) {
        case 'GET':
            submissionController.getSubmission
        case 'PUT':
            submissionController.updateSubmission
        case 'DELETE':
            submissionController.deleteSubmission
        default:
            res.status(400).json({ success: false });
    }
}