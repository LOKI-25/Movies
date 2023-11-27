import Payment from "../models/Payment.js";

export const createPayment = async (req, res, next) => {
  const newPayment = new Payment(req.body);
  try {
    const savedPayment = await newPayment.save();
    res.status(200).json(savedPayment);
  } catch (err) {
    next(err);
  }
};

export const updatePayment = async (req, res, next) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedPayment);
  } catch (err) {
    next(err);
  }
};

export const deletePayment = async (req, res, next) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.status(200).json(`Payment ${req.params.id} deleted.`);
  } catch (err) {
    next(err);
  }
};

export const getPayment = async (req, res, next) => {
  try {
    const user = await Payment.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getPayments = async (req, res, next) => {
  try {
    const users = await Payment.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Add payment to an existing customer
export async function addPaymentToCustomer(customerId, newPayment) {
  try {
    let paymentRecord = await Payment.findOne({ customer_id: customerId });

    if (!paymentRecord) {
      // If no payment record found for the customer, create a new one
      paymentRecord = new Payment({
        customer_id: customerId,
        payments: [newPayment],
      });
    } else {
      // Add the new payment to the existing payments array
      paymentRecord.payments.push(newPayment);
    }

    // Save the updated payment record
    const updatedPaymentRecord = await paymentRecord.save();
    console.log("New payment added:", updatedPaymentRecord);
  } catch (error) {
    console.error("Error adding payment:", error);
  }
}
