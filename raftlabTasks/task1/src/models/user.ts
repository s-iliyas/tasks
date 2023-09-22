import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("event", UserSchema);

export default User;
