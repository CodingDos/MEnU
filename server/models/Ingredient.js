import mongoose from "mongoose";

const Schema = mongoose.Schema;
let Ingredient = new Schema(
  {
    recipe: { type: Schema.Types.ObjectId, ref: "recipe" },
    name: {type: String, required: true },
    quantity: {type: Number, required: false }
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields automatically
  }
);
export default mongoose.model( "ingredients", Ingredient );
