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
            return res.json({ students });
        case 'POST':
            const student = await userModel.findOne({ _id: req.body._id });
            if (student === null) {
                const result = await userModel.create(req.body);
                if (result === null) {
                    return res.status(500);
                } else {
                    return res.json({ status: 201, data: result });
                }
            } else {
                return res.status(422);
            }
        default:
            return res.json({ status: 400, success: false });
    }
}