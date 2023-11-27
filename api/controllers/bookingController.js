import { v4 as uuidv4 } from "uuid";
import Theatre from "../models/Theatre.js";
import { addPaymentToCustomer } from "./paymentController.js";
import { addReservationToCustomer } from "./reservationController.js";
import { addTicket } from "./ticketController.js";

export const createBooking = async (req, res, next) => {
  try {
    const payload = req.body;

    const customerDetails = payload.user;
    const cardDetails = payload.card;
    const bookedSeats = payload.seats;
    const movieData = payload.data;
    const movie = movieData.movie;
    const movieTitle = movie.title;
    const showsList = movieData["shows"][movieTitle];
    const show = showsList[0];

    // console.log(`KMJ :: bookingController - ${JSON.stringify(userDetails)}`);

    // 1. Store tickets
    const ticketId = uuidv4();
    for (const seat of bookedSeats) {
      const ticket = {
        title: movieTitle,
        start: show.start,
        end: show.end,
        schedule_id: 1,
        screen_number: show.screen_name,
        seat: seat,
        theatre_name: show.theatre_name,
        ticket_id: ticketId,
      };
      console.log(
        `KMJ :: bookingController - 1. Saving ticket ${JSON.stringify(ticket)}`,
      );

      const savedTicket = await addTicket(ticket);
    }

    const customerId = customerDetails._id;

    // 2. Record payment
    const paymentId = uuidv4();
    const payment = {
      amount: bookedSeats.length * movie.price,
      card: {
        number: cardDetails.number,
        expiry: cardDetails.expiry,
        secret: cardDetails.secret,
        name: cardDetails.name,
      },
      id: paymentId,
      mode: "card",
      status: "SUCCESS",
    };
    console.log(
      `KMJ :: bookingController - 2. Payment ${JSON.stringify(payment)}`,
    );
    await addPaymentToCustomer(customerId, payment);

    // 3. Save reservations
    const reservationId = uuidv4();
    const reservation = {
      payment_id: paymentId,
      reservation_id: reservationId,
      status: "CONFIRMED",
      schedule_id: "1",
      screen_id: show.screen_name,
      theatre_id: show.theatre_name,
      ticket_id: ticketId,
    };
    console.log(
      `KMJ :: bookingController - 3. Reservation ${JSON.stringify(
        reservation,
      )}`,
    );
    await addReservationToCustomer(customerId, reservation);

    // 4. Update theatres
    const theatreName = show.theatre_name;
    const state = show.state;
    const city = show.city;
    const theatre = await Theatre.findOne({
      state: state,
      city: city,
      name: theatreName,
    });
    console.log(
      `KMJ :: bookingController - 4. Fetched theatre ${JSON.stringify(
        theatre,
      )}`,
    );
    for (const screen of theatre.screens) {
      for (const s of screen.shows) {
        if (s.movie_title === movieTitle) {
          // Remove bookedSeats from availableSeats
          s.available_seats = [
            ...new Set(
              s.available_seats.filter((seat) => !bookedSeats.includes(seat)),
            ),
          ];

          // Avoid duplicates when adding bookedSeats to reservedSeats
          const seatsToAdd = bookedSeats.filter(
            (seat) => !s.reserved_seats.includes(seat),
          );

          // Add seatsToAdd to reservedSeats
          s.reserved_seats = [...new Set(s.reserved_seats.concat(seatsToAdd))];
        }
      }
    }

    console.log(
      `KMJ :: bookingController - 4. updated theatre ${JSON.stringify(
        theatre,
      )}`,
    );

    const updatedTheatre = await Theatre.findByIdAndUpdate(
      theatre._id,
      { $set: theatre },
      { new: true },
    );

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const deleteBooking = async (req, res, next) => {};

export const getBooking = async (req, res, next) => {};

export const getBookings = async (req, res, next) => {};
