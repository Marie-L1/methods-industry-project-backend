import * as yup from "yup";

const familyMemberSchema = yup.object().shape({
  age: yup.number().positive().integer().required("Age is required"),
  name: yup.string().optional(),
  favorite_genre: yup.string().required("Favorite genre is required"),
  theme_packs: yup.array().of(yup.string()).optional(),
  favorite_movie: yup.string().optional(),
});

const planInputSchema = yup.object().shape({
  budget: yup.number().positive().required("Budget is required"),
  family_members: yup
    .array()
    .required("Family members are required")
    .of(familyMemberSchema)
    .min(1, "At least one family member is required"),
});

export const validatePlanInput = async (req, res, next) => {
  try {
    const validateData = await planInputSchema.validate(req.body, {
      abortEarly: false,
    });
    req.body = validateData;
    next();
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({ errors: error.message });
    } else {
      next(error);
    }
  }
};
