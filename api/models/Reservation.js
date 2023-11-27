import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  reservations: [
    {
      payment_id: String,
      reservation_id: String,
      status: String,
      schedule_id: String,
      screen_id: String,
      theatre_id: String,
      ticket_id: String,
    },
  ],
  customer_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Reservation", ReservationSchema);
