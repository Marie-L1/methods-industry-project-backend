import express from "express";
import { validatePlanInput } from "../middlewares/validation.js";
import { logRequest } from "../middlewares/log.js";
import { getGenre, getPackByGenre, getServiceByTopic } from "../utils/recommendation.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// router.post("/", logRequest, validatePlanInput, (req, res) => {
//   try {
//     const { budget, family_members } = req.body;

//     const recommendation = getRecommendation(budget, family_members);
//     const { streaming_services, theme_packs } = recommendation;
    
//     replaceThemePackImageUrls(theme_packs);
//     replaceStreamingServiceImageUrls(streaming_services);
//     res.json({ streaming_services, theme_packs });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const replaceThemePackImageUrls = (theme_packs) => {
//   theme_packs.forEach((theme_pack) => {
//     theme_pack.channels.forEach((channel) => {
//       channel.image = replaceImageUrl(channel.image);
//     });
//   });
// };

// const replaceStreamingServiceImageUrls = (streaming_services) => {
//   streaming_services.forEach((service) => {
//     service.image = replaceImageUrl(service.image);
//   });
// };


router.post("/", logRequest, validatePlanInput, (req, res) => {
  try{
    const { budget, family_memebers, genre } = req.body;

    // ensure the genre exits in the avalible genres
    const avaliableGenres = getGenre();
    if (!avaliableGenres.includes(genre)){
      return res.status(400).json({ error: "Invalid genre."});
    }

    // get them packages based on the selected genre
    const theme_packs = getPackByGenre(genre);

    if (theme_packs.length === 0){
      return res.status(400).json({ error: "No theme packages found for the selected genre."});
    }

    // use the TOPIC of the first theme package to get the matching streaming service
    const topic = theme_packs[0]?.topic;
    const streaming_services = getServiceByTopic(topic);

    if (streaming_services.length === 0){
      res.status(400).json({ error: "No streaming serves found for the selected topic" });
    }

    // response is the filtered streaming service and theme packages
    res.json({ streaming_services, theme_packs })

  }catch(error){
    res.status(500).json({ error: "Could not complete request"})
  }
})

export default router;
