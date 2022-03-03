import * as jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import dbConnect from "../../../lib/dbConnect";
import { JWT_SECRET } from "../../../util/secrets";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            passport.authenticate("local", function (err, user, info) {
                // no async/await because passport works only with callback ..
                if (!user) {
                    return res.status(401).json({ status: "error", code: "unauthorized" });
                } else {
                    const token = jwt.sign({ username: user.username }, JWT_SECRET);
                    res.status(200).send({ token: token });
                }
            });
        default:
            res.status(400).json({ success: false });
            break;
    }
}
