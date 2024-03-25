import { Router } from "express";
import * as controllers from "../controllers/auth.js";

const router = Router();

//ROUTES - AUTH
router.post("/register", controllers.registerUser); //Will create a new user in the register endpoint
router.post("/login", controllers.login); //Will log user in
router.get("/verify", controllers.verify); //will verify user with their unique token
router.put("/edit/:id", controllers.editUser); //Will edit user
router.get("/all", controllers.getUsers); //will pull all users 
// router.post("/change-password", controllers.changePassword); //Will allow user to change their password





export default router;