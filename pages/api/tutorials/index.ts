import { NextApiRequest, NextApiResponse } from "next";
import adminHandler from "../../../lib/adminHandler";
import dbConnect from "../../../lib/dbConnect";
import tutorialModel from "../../../models/tutorialModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    adminHandler(req, res);

    await dbConnect();

    switch (method) {
        case 'GET':
            const tutorials = await tutorialModel.find();
            res.json({ tutorials });
            break;
        case 'POST':
            // const tutorial = await tutorialModel.findOne({ _id: req.body._id });
            const tutorial = null;
            if (tutorial === null) {
                const result = await tutorialModel.create(req.body);
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
            res.json({ status:400, success: false });
            break;
    }
}