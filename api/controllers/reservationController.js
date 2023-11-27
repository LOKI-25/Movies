import Reservation from "../models/Reservation.js";
import Payment from "../models/Payment.js";

export const createReservation = async (req, res, next) => {
  const newReservation = new Reservation(req.body);
  try {
    const savedReservation = await newReservation.save();
    res.status(200).json(savedReservation);
  } catch (err) {
    next(err);
  }
};

export const updateReservation = async (req, res, next) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedReservation);
  } catch (err) {
    next(err);
  }
};

export const deleteReservation = async (req, res, next) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json(`Reservation ${req.params.id} deleted.`);
  } catch (err) {
    next(err);
  }
};

export const getReservation = async (req, res, next) => {
  try {
    const user = await Reservation.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getReservations = async (req, res, next) => {
  try {
    const users = await Reservation.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Add reservation to an existing customer
export async function addReservationToCustomer(customerId, newReservation) {
  try {
    let reservationRecord = await Reservation.findOne({
      customer_id: customerId,
    });

    if (!reservationRecord) {
      // If no reservation record found for the customer, create a new one
      reservationRecord = new Reservation({
        customer_id: customerId,
        reservations: [newReservation],
      });
    } else {
      // Add the new reservation to the existing payments array
      reservationRecord.reservations.push(newReservation);
    }

    // Save the updated reservation record
    const updatedReservationRecord = await reservationRecord.save();
    console.log("New reservation added:", updatedReservationRecord);
  } catch (error) {
    console.error("Error adding reservation:", error);
  }
}
