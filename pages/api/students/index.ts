import { NextApiRequest, NextApiResponse } from "next";
import adminHandler from "../../../lib/adminHandler";
import dbConnect from "../../../lib/dbConnect";
import userModel from "../../../models/userModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    adminHandler(req, res);
    
    await dbConnect();

    switch (method) {
        case 'GET':
            const students = await userModel.find({ role: "STUDENT" }).exec();
            res.json({ students });
            break;
        case 'POST':
            const student = await userModel.findOne({ _id: req.body._id });
            if (student === null) {
                const result = await userModel.create(req.body);
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