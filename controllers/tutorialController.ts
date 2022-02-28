import type { NextApiRequest, NextApiResponse } from "next";
import Tutorial from "../models/tutorial";

export class TutorialController {

    public async getTutorials(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const tutorials = await Tutorial.find();
        res.json({ tutorials });
    }

    public async getTutorial(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const tutorial = await Tutorial.findOne({ _id: req.query.id });
        if (tutorial === null) {
            res.status(404);
        } else {
            res.json(tutorial);
        }
    }

    public async createTutorial(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const newTutorial = new Tutorial(req.body);
        const tutorial = await Tutorial.findOne({ _id: req.body._id });
        if (tutorial === null) {
            const result = await newTutorial.save();
            if (result === null) {
                res.status(500);
            } else {
                res.status(201).json({ status: 201, data: result });
            }

        } else {
            res.status(422);
        }
    }

    public async updateTutorial(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const tutorial = await Tutorial.findOneAndUpdate({ _id: req.query.id }, req.body);
        if (tutorial === null) {
            res.status(404);
        } else {
            const updatedTutorial = { _id: req.query.id, ...req.body };
            res.json({ status: res.status, data: updatedTutorial });
        }
    }

    public async deleteTutorial(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        const tutorial = await Tutorial.findOneAndDelete({ _id: req.query.id });
        if (tutorial === null) {
            res.status(404);
        } else {
            res.json({ NextApiResponse: "Tutorial deleted Successfully" });
        }
    }
}