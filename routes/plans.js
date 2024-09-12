import express from "express";
import { validatePlanInput } from "../middlewares/validation";
import { getRecommendation } from "../utils/recommendation";

const router = express.Router();

router.post("/", validatePlanInput, (req, res) => {
    const { budget, family_members } = req.body;
    const recommendation = getRecommendation(budget, family_members);
    res.json(recommendation);
});

export default router;