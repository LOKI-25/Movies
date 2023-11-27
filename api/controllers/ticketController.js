import Ticket from "../models/Ticket.js";
import Payment from "../models/Payment.js";

export const createTicket = async (req, res, next) => {
  const newTicket = new Ticket(req.body);
  try {
    const savedTicket = await newTicket.save();
    res.status(200).json(savedTicket);
  } catch (err) {
    next(err);
  }
};

export const updateTicket = async (req, res, next) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedTicket);
  } catch (err) {
    next(err);
  }
};

export const deleteTicket = async (req, res, next) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.status(200).json(`Ticket ${req.params.id} deleted.`);
  } catch (err) {
    next(err);
  }
};

export const getTicket = async (req, res, next) => {
  try {
    const user = await Ticket.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getTickets = async (req, res, next) => {
  try {
    const users = await Ticket.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export async function addTicket(ticket) {
  try {
    const newTicket = new Ticket(ticket);
    return await newTicket.save();
  } catch (error) {
    console.error("Error adding ticket:", error);
  }
}
