import { NextApiRequest, NextApiResponse } from "next";
import adminHandler from "../../../lib/adminHandler";
import dbConnect from "../../../lib/dbConnect";
import batchModel from "../../../models/batchModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    adminHandler(req, res);
    
    await dbConnect();

    switch (method) {
        case 'GET':
            const batches = await batchModel.find();
            return res.json({ batches })
        case 'POST':
            const batch = await batchModel.findOne({ batchCode: req.body.batchCode });
            if (batch === null) {
                const result = await batchModel.create(
                    req.body
                )
                if (result === null) {
                    return res.status(500);
                } else {
                    return res.status(201).json({ status: 201, data: result });
                }
            } else {
                return res.status(422);
            }
        default:
            return res.status(400).json({ success: false });
    }
}