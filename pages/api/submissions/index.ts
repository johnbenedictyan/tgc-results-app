import { NextApiRequest, NextApiResponse } from "next";
import adminHandler from "../../../lib/adminHandler";
import dbConnect from "../../../lib/dbConnect";
import submissionModel from "../../../models/submissionModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            adminHandler(req, res);
            const submissions = await submissionModel.find();
            res.json({ submissions });
            break;
        case 'POST':
            const submission = await submissionModel.findOne({ _id: req.body._id });
            if (submission === null) {
                const result = await submissionModel.create(req.body);
                if (result === null) {
                    res.status(500);
                } else {
                    res.json({ status: 201, data: result });
                }
            } else {
                res.status(422);
            }
            break;
        default:
            res.json({ status: 400, success: false });
            break;
    }
}