import { Router } from "express";
import userRoutes from "./userRoutes.js";
import recipeRoutes from "./recipe.js";
import commentRoutes from "./comment.js";


const router = Router();

router.get("/", (req, res) => res.send("This is MEnU landing page!"));

router.use("/user", userRoutes);
router.use("/recipe", recipeRoutes);
router.use("/comment", commentRoutes);



export default router;
