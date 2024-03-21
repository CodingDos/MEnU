import { Router } from "express";
import * as controllers from "../controllers/recipe.js";

const router = Router();


// Get all Recipes under one user - For the profile page. - needs token
router.get("/dashboard", controllers.getUserRecipes);

router.get("/", controllers.getAllRecipes); //Will get all recipes of all users for our feed page
router.get("/:id", controllers.getRecipe); // Will get a specific recipe using the recipe ID
router.post("/create", controllers.createRecipe);
router.put("/edit/:id", controllers.editRecipe); // Will be able to edit a specific recipe using the recipe ID
router.delete("/delete/:id", controllers.deleteRecipe); // will be able to delete recipe using recipe ID


export default router;