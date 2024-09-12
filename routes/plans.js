import express from "express";
import { validatePlanInput } from "../middlewares/validation.js";
import { getRecommendation } from "../utils/recommendation.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", validatePlanInput, (req, res) => {
    const { budget, family_members } = req.body;
    const recommendation = getRecommendation(budget, family_members);
    const { streaming_services, theme_packs } = recommendation;
    replaceThemePackImageUrls(theme_packs);
    replaceStreamingServiceImageUrls(streaming_services);
    res.json({ streaming_services, theme_packs });
});

const replaceThemePackImageUrls = (theme_packs) => {
    theme_packs.forEach(theme_pack => {
        theme_pack.channels.forEach(channel => {
            channel.image = replaceImageUrl(channel.image);
        });
    });
};

const replaceStreamingServiceImageUrls = (streaming_services) => {
    streaming_services.forEach(service => {
        service.image = replaceImageUrl(service.image);
    });
};

export default router;