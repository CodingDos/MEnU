import express from "express";
import db from "./db/connections.js";
import cors from "cors";
import logger from "morgan";
import chalk from "chalk";
// import dotenv from "dotenv";
import allRoutes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.use("/", allRoutes);

db.on("connected", () => {
  console.clear();
  console.log(chalk.blue("Connected to MongoDB!"));
  
  app.listen(PORT, () => {
    process.env.NODE_ENV === "production"
      ? console.log(`Express server running in production on port ${PORT}\n\n`)
      : console.log(
          `Express server running in development on: http://localhost:${PORT}`
        );
  });
});
