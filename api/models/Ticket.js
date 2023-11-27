import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  title: String,
  start: String,
  end: String,
  schedule_id: String,
  screen_number: String,
  seat: String,
  theatre_name: String,
  ticket_id: String,
});

export default mongoose.model("Ticket", TicketSchema);
