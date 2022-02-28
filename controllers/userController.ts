import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import "../auth/passportHandler";
import userModel from "../models/userModel";
import { JWT_SECRET } from "../util/secrets";


export class UserController {

    public async registerUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

        await userModel.create({
            username: req.body.username,
            password: hashedPassword,

        });

        const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, JWT_SECRET!);
        res.status(200).send({ token: token });
    }

    public authenticateUser(req: NextApiRequest, res: NextApiResponse, next: any) {
        passport.authenticate("local", function (err: any, user: any, info: any) {
            // no async/await because passport works only with callback ..
            if (err) return next(err);
            if (!user) {
                return res.status(401).json({ status: "error", code: "unauthorized" });
            } else {
                const token = jwt.sign({ username: user.username }, JWT_SECRET!);
                res.status(200).send({ token: token });
            }
        });
    }
}