export const validatePlanInput = (req, res, next) => {
    /*
    budget: number
    family_members: {
        age: number //required
        name: string //optional
        favorite_genre: string //required
        theme_packs: string[] //optional
        favorite_movie: string //optional
    }[]
    */
   // TODO: implement validation
    // const { budget, family_members} = req.body;
    // const { age, favorite_genre } = family_members;
    // const requiredFields = ["age", "favorite_genre", "budget"];
    // const missingFields = requiredFields.filter(field => !req.body[field]);
    // if (missingFields.length > 0) {
    //     return res.status(400).json({ message: `Missing required fields: ${missingFields.join(", ")}` });
    // }
    next();
};