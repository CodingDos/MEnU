import { Router } from "express";
// import * as controllers from "../controllers/comment";

const router = Router();

router.get("/", controllers.getComments); 
router.get("/:id", controllers.getComment); 
router.put("/edit/:id", controllers.editComment); 
router.delete("/delete/:id", controllers.deleteComment); 

export default router;