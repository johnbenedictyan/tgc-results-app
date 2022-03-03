
import type { NextApiRequest, NextApiResponse } from "next";
import batchModel from "../models/batchModel";


export class BatchController {
    public async getBatches(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const batches = await batchModel.find();
        res.json({ batches })
    }

    public async getBatch(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const batch = await batchModel.findOne({ _id: req.query.id });
        if (batch === null) {
            res.status(404);
        } else {
            res.json(batch);
        }
    }

    public async createBatch(req: NextApiRequest, res: NextApiResponse): Promise<void> {
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
    }

    public async updateBatch(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const batch = await batchModel.findOneAndUpdate({ _id: req.query.id }, req.body);
        if (batch === null) {
            res.status(404);
        } else {
            const updatedBatch = { _id: req.query.id, ...req.body };
            res.json({ status: res.status, data: updatedBatch });
        }
    }

    public async deleteBatch(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const batch = await batchModel.findOneAndDelete({ _id: req.query.id });
        if (batch === null) {
            res.status(404);
        } else {
            res.json({ NextApiResponse: "Batch deleted Successfully" });
        }
    }
}