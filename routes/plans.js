import express from "express";
import { validatePlanInput } from "../middlewares/validation.js";
import { logRequest } from "../middlewares/log.js";
import { getRecommendation } from "../utils/recommendation.js";
import { replaceImageUrl } from "../utils/resourceHandler.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", logRequest, validatePlanInput, (req, res) => {
  try {
    const { budget, family_members } = req.body;
    const recommendation = getRecommendation(budget, family_members);
    const { streaming_services, theme_packs } = recommendation;
    replaceThemePackImageUrls(theme_packs);
    replaceStreamingServiceImageUrls(streaming_services);
    res.json({ streaming_services, theme_packs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const replaceThemePackImageUrls = (theme_packs) => {
    theme_packs.forEach((theme_pack) => {
      if (theme_pack.image) {
        theme_pack.image = replaceImageUrl(theme_pack.image);
      }
    });
};

const replaceStreamingServiceImageUrls = (streaming_services) => {
  streaming_services.forEach((service) => {
    if (service.image) {
      service.image = replaceImageUrl(service.image);
    }
  });
};

export default router;
