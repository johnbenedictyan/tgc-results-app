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
            try {
                let user = await userModel.findOne({ email }).exec();
                if (!user) {
                    return res.json({ status: 401, code: "unauthorized" });
                }
                try {
                    user.comparePassword(password, (err: Error, isMatch: boolean) => {
                        if (isMatch) {
                            const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET);
                            return res.send({ status: 200, token: token });
                        } else {
                            return res.json({ status: 401, code: "unauthorized" });
                        }
                    });
                } catch (err) {
                    return res.json({ status: 400, success: false });
                }
            } catch (err) {
                return res.json({ status: 400, success: false });
            }
        default:
            return res.json({ status: 400, success: false });
    }
}
