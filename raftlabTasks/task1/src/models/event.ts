import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    userId: String,
    completed: Boolean,
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
