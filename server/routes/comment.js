import { Router } from "express";
import * as controllers from "../controllers/comment";

const router = Router();

router.get("/:recipeId", controllers.getComments); 
router.put("/edit/:id", controllers.editComment);
router.post("/create/recipeId", controllers.createComment);
router.delete("/delete/:id", controllers.deleteComment); 

export default router;