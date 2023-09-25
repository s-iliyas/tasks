import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: String,
  completed: Boolean,
});

const Event = mongoose.models.Event || mongoose.model("event", EventSchema);

export default Event;
