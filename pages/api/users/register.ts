import bcrypt from "bcryptjs";
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
            const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

            await userModel.create({
                email: req.body.email,
                password: hashedPassword,
                name: req.body.name,
                role: req.body.role
            });

            const token = jwt.sign({ email: req.body.email, scope: req.body.scope }, JWT_SECRET);
            res.status(200).send({ token: token });
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
