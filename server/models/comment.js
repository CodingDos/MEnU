import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Comment = new Schema(
  {
    recipe: { type: Schema.Types.ObjectId, ref: "recipe" },
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    title: { type: String, unique: true },
    comment: { type: String, unique: true },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields automatically
  }
);

export default mongoose.model("comments", Comment);
