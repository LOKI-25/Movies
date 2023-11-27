import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import adminRoute from "./routes/adminRoute.js";
import customerRoute from "./routes/customerRoute.js";
import movieRoute from "./routes/movieRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import reservationRoute from "./routes/reservationRoute.js";
import theatreRoute from "./routes/theatreRoute.js";
import ticketRoute from "./routes/ticketRoute.js";
import authRoute from "./routes/authRoute.js";
import bookingRoute from "./routes/bookingRoute.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env["MONGODB_URL"]);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

// middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/admins", adminRoute);
app.use("/api/customers", customerRoute);
app.use("/api/movies", movieRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/reservations", reservationRoute);
app.use("/api/theatres", theatreRoute);
app.use("/api/tickets", ticketRoute);
app.use("/api/bookings", bookingRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8900, () => {
  connect();
  console.log("Connected to backend.");
});
