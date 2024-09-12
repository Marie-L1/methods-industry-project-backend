import express from "express";
import { validatePlanInput } from "../middlewares/validation";
import { getRecommendation } from "../utils/recommendation";

const router = express.Router();

router.post("/", validatePlanInput, (req, res) => {
    const { budget, family_members } = req.body;
    const recommendation = getRecommendation(budget, family_members);
    res.json(recommendation);
});


// recommendations

let userPreferences = [];

// endpoint to receive user preferences
router.post("/preferences", (req, res) => {
    const { themePack } = req.body;

    try{
        if (themePack) {
            // only store the theme packs
            userPreferences.push(themePack);
            res.json(userPreferences)
        } else{
          res.status(400).json({ message: "Theme pack is required" })
        }

    }catch(error){
        res.status(400).json({ message: "Couldn't log preference." }, error);
    }
})

// endpoint to handle generating the recommendations
router.get("/recommendations", (req, res) => {
  try{
    // get the recommendations based on the user preferences
    const recommendation = getRecommendation(userPreferences);
    res.json(recommendation)
  }catch(error){
    res.status(400).json({ message: "Couldn't log recommendation." }, error);
  }
})

export default router;