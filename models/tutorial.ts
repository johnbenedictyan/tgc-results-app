import { model, models } from "mongoose";
import ITutorial from "../interfaces/tutorial";
import tutorialSchema from "../schemas/tutorial";

export default models.Tutorial || model<ITutorial>("Tutorial", tutorialSchema);