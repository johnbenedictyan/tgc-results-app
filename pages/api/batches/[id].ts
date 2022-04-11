import { NextApiRequest, NextApiResponse } from "next";
import IBatch from "../../../interfaces/batch";
import adminHandler from "../../../lib/adminHandler";
import dbConnect from "../../../lib/dbConnect";
import batchModel from "../../../models/batchModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    let batch: IBatch | null;

    adminHandler(req, res);

    await dbConnect();

    switch (method) {
        case 'GET':
            batch = await batchModel.findOne({ _id: req.query.id });
            if (batch === null) {
                res.status(404);
            } else {
                res.json(batch);
            }
            break;
        case 'PUT':
            batch = await batchModel.findOneAndUpdate({ _id: req.query.id }, req.body);
            if (batch === null) {
                res.status(404);
            } else {
                const updatedBatch = { _id: req.query.id, ...req.body };
                res.json({ status: 200, data: updatedBatch });
            }
            break;
        case 'DELETE':
            batch = await batchModel.findOneAndDelete({ _id: req.query.id });
            if (batch === null) {
                res.status(404);
            } else {
                res.json({ status: 200, data: { message: "Batch deleted Successfully" } });
            }
            break;
        default:
            res.json({ status: 400, success: false });
            break;
    }
}