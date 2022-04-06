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
                return res.status(404);
            } else {
                return res.json(batch);
            }
        case 'PUT':
            batch = await batchModel.findOneAndUpdate({ _id: req.query.id }, req.body);
            if (batch === null) {
                return res.status(404);
            } else {
                const updatedBatch = { _id: req.query.id, ...req.body };
                return res.json({ status: res.status, data: updatedBatch });
            }
        case 'DELETE':
            batch = await batchModel.findOneAndDelete({ _id: req.query.id });
            if (batch === null) {
                return res.status(404);
            } else {
                return res.json({ status: res.status, data: { message: "Batch deleted Successfully" } });
            }
        default:
            return res.status(400).json({ success: false });
    }
}