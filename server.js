import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import plansRouter from "./routes/plans.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/plans", plansRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});