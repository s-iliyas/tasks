import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    adult: { type: Boolean, default: false },
    backdrop_path: { type: String, default: "" },
    genre_ids: [],
    _id: Number,
    original_language: { type: String, default: "" },
    original_title: { type: String, default: "" },
    title: { type: String, default: "" },
    overview: { type: String, default: "" },
    poster_path: { type: String, default: "" },
    release_date: { type: String, default: "" },
    vote_count: { type: Number },
    vote_average: { type: mongoose.Schema.Types.Decimal128 },
    isTMDB: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const MovieModel = mongoose.model("Movie", MovieSchema);
