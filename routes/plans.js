import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.send("Hello Plans");
});

export default router;