import { Router } from "express";
import * as controllers from "../controllers/recipe.js";

const router = Router();

router.get("/", controllers.getRecipes); //Will get all recipes based on userID
router.get("/:id", controllers.getRecipe); // Will get a specific recipe using the recipe ID
router.post("/create", controllers.createRecipe);
router.put("/edit/:id", controllers.editRecipe); // Will be able to edit a specific recipe using the recipe ID
router.delete("/delete/:id", controllers.deleteRecipe); // will be able to delete recipe using recipe ID

export default router;