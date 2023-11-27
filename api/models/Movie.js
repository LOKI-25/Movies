import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  certificate: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  genres: {
    type: [String],
  },
  photos: {
    type: [String],
  },
  release_date: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Movie", MovieSchema);
