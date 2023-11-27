import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  payments: [
    {
      amount: Number,
      card: {
        number: String,
        expiry: String,
        secret: String,
        name: String,
      },
      id: String,
      mode: String,
      status: String,
    },
  ],
  customer_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Payment", PaymentSchema);
