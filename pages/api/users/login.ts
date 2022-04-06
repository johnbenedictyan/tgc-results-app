import * as jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import userModel from "../../../models/userModel";
import { JWT_SECRET } from '../../../util/secrets';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            const { email, password } = req.body;
            let user = await userModel.findOne({ email }).exec();
            if (!user) {
                return res.status(401).json({ status: "error", code: "unauthorized" });
            }
            user.comparePassword(password, (err: Error, isMatch: boolean) => {
                if (isMatch) {
                    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET);
                    return res.status(200).send({ token: token });
                }
                return res.status(401).json({ status: "error", code: "unauthorized" });
            });
        default:
            return res.status(400).json({ success: false });
    }
}
