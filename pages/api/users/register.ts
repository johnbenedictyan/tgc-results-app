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
            await userModel.create(req.body);
            const token = jwt.sign({ email: req.body.email, role: req.body.role, scope: req.body.scope }, JWT_SECRET);
            return res.status(200).send({ token: token });
        default:
            return res.status(400).json({ success: false });
    }
}
