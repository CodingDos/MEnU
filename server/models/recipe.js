import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Recipe = new Schema(
  {
    mealName: {type: String, required: true},
    instructions: { type: String, required: true },
    image:{type: String, required: true },
    // calories:{type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "users" }, //double check with team
    ingredients: [{
        name: {type: String, required: true },
        quantity: {type: Number, required: false },
        measurement: {type: String, required: false }
    }],
  },
  { timestamps: true }
);
export default mongoose.model("recipes", Recipe);