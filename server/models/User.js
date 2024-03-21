import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {type: String},
    email: { type: String},
    password_digest: { type: String, required: true, select: false },
    firstName:{type: String},
    lastName:{type: String},
    description: {type: String}
  },
  { timestamps: true }
);
export default mongoose.model("users", User);
