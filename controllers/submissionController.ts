import type { NextApiRequest, NextApiResponse } from "next";
import submissionModel from "../models/submissionModel";

export class SubmissionController {

    public async getSubmissions(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const submissions = await submissionModel.find();
        res.json({ submissions });
    }

    public async getSubmission(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const submission = await submissionModel.findOne({ _id: req.query.id });
        if (submission === null) {
            res.status(404);
        } else {
            res.json(submission);
        }
    }

    public async createSubmission(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const submission = await submissionModel.findOne({ _id: req.body._id });
        if (submission === null) {
            const result = await submissionModel.create(req.body);
            if (result === null) {
                res.status(500);
            } else {
                res.status(201).json({ status: 201, data: result });
            }

        } else {
            res.status(422);
        }
    }

    public async updateSubmission(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const submission = await submissionModel.findOneAndUpdate({ _id: req.query.id }, req.body);
        if (submission === null) {
            res.status(404);
        } else {
            const updatedSubmission = { _id: req.query.id, ...req.body };
            res.json({ status: res.status, data: updatedSubmission });
        }
    }

    public async deleteSubmission(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const submission = await submissionModel.findOneAndDelete({ _id: req.query.id });
        if (submission === null) {
            res.status(404);
        } else {
            res.json({ NextApiResponse: "Submission deleted Successfully" });
        }
    }
}