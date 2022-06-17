import * as jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { JWT_SECRET } from "../util/secrets";

function adminHandler(req: NextApiRequest, res: NextApiResponse) {
    if(!req.headers.authorization) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
    } else{     
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
            if(!decoded.role || decoded.role != 'ADMIN') {
                return res.status(401).json({ status: "error", code: "unauthorized" });
            }
        });
    }
}

export default adminHandler;