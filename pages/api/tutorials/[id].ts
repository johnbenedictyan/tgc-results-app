import { NextApiRequest, NextApiResponse } from "next";
import ITutorial from "../../../interfaces/tutorial";
import adminHandler from "../../../lib/adminHandler";
import dbConnect from "../../../lib/dbConnect";
import submissionModel from "../../../models/submissionModel";
import tutorialModel from "../../../models/tutorialModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    let tutorial: ITutorial | null;

    adminHandler(req, res);

    await dbConnect();

    switch (method) {
        case 'GET':
            tutorial = await tutorialModel.findOne({ _id: req.query.id });
            if (tutorial === null) {
                return res.status(404);
            } else {
                return res.json(tutorial);
            }
        case 'PUT':
            tutorial = await tutorialModel.findOneAndUpdate({ _id: req.query.id }, req.body);
            if (tutorial === null) {
                return res.status(404);
            } else {
                const updatedTutorial = { _id: req.query.id, ...req.body };
                return res.json({ status: res.status, data: updatedTutorial });
            }
        case 'DELETE':
            tutorial = await tutorialModel.findOneAndDelete({ _id: req.query.id });
            if (tutorial === null) {
                return res.status(404);
            } else {
                submissionModel.deleteMany({ tutorialCode: tutorial.tutorialCode }).exec();
                return res.json({ NextApiResponse: "Tutorial deleted Successfully" });
            }
        default:
            return res.status(400).json({ success: false });
    }
}