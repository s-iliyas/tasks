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

// Check if the model already exists, and if not, create it
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
