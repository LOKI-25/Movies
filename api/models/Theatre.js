import mongoose from "mongoose";

const TheatreSchema = new mongoose.Schema({
  name: String,
  state: String,
  city: String,
  zipcode: String,
  screens: [
    {
      capacity: Number,
      screen_id: String,
      name: String,
      screen_type: String,
      shows: [
        {
          movie_title: String,
          available_seats: [Number],
          reserved_seats: [Number],
          total_seats: Number,
          start: String,
          end: String,
          show_id: String,
          price: Number,
          release_date: String,
        },
      ],
    },
  ],
});

export default mongoose.model("Theatre", TheatreSchema);
