import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import batchModel from "../../../models/batchModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            const batches = await batchModel.find();
            res.json({ batches })
            break;
        case 'POST':
            const batch = await batchModel.findOne({ batchCode: req.body.batchCode });
            if (batch === null) {
                const result = await batchModel.create(
                    req.body
                )
                if (result === null) {
                    res.status(500);
                } else {
                    res.status(201).json({ status: 201, data: result });
                }
            } else {
                res.status(422);
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}