import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    name: String,
  },
  { timestamps: true }
);

export const GenreModel = mongoose.model("Genre", GenreSchema);
