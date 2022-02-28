import { NextApiRequest, NextApiResponse } from "next";
import { BatchController } from "../../../controllers/batchController";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    const batchController = new BatchController();

    await dbConnect();

    switch (method) {
        case 'GET':
            batchController.getBatches
        case 'POST':
            batchController.createBatch
        default:
            res.status(400).json({ success: false })
    }
}