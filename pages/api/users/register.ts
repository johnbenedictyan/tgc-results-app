import * as jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import userModel from "../../../models/userModel";
import { JWT_SECRET } from "../../../util/secrets";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                await userModel.create(req.body);
                const token = jwt.sign({ email: req.body.email, role: req.body.role, scope: req.body.scope }, JWT_SECRET);
                return res.send({ status: 200, token: token });
            } catch (err) {
                return res.json({ status: 400, success: false });
            }
        default:
            return res.json({ status: 400, success: false });
    }
}
