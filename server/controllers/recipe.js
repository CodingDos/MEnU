import jwt  from "jsonwebtoken";
import Recipe from "../models/recipe";


// For our public feed to show all recipes of any user
// MEnU.com/recipe
export const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


// For comments? 
// MEnU.com/recipe/:id
export const getRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = Recipe.findById(id);
        res.status(200).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


// User Dashboard - show all their posted recipes on their profile
// MEnU.com/recipe/dashboard
export const getUserRecipes = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res
              .status(401)
              .json({ error: "Authorization token not provided" });
          }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decoded.id;

        const userRecipes = await Recipe.find({ userId });
        res.json(userRecipes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// MEnU.com/recipe/create
export const createRecipe = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        if (!token) {
            return res
              .status(401)
              .json({ error: "Authorization token not provided" });
          }

          const decoded = jwt.verify(token, process.env.TOKEN_KEY);
          const userId = decoded.id;

        //   Create a new recipe with the user ID
          const newRecipe = new Recipe({...req.body, userId});
        // Save the new recipe in the DB 
          await newRecipe.save();

          res.status(201).json(newRecipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


// MEnU.com/recipe/edit/:id
export const editRecipe = async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


// MEnU.com/recipe/delete/:id
export const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Recipe.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).send("Recipe deleted");
          }
          throw new Error("Recipe not found");
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}