import { NextApiRequest, NextApiResponse } from "next";
import { TutorialController } from "../../../controllers/tutorialController";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    const tutorialController = new TutorialController();

    await dbConnect();

    switch (method) {
        case 'GET':
            tutorialController.getTutorial
        case 'PUT':
            tutorialController.updateTutorial
        case 'DELETE':
            tutorialController.deleteTutorial
        default:
            res.status(400).json({ success: false });
    }
}