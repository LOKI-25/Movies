import Customer from "../models/Customer.js";

export const createCustomer = async (req, res, next) => {
  const newCustomer = new Customer(req.body);
  try {
    const savedCustomer = await newCustomer.save();
    res.status(200).json(savedCustomer);
  } catch (err) {
    next(err);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedCustomer);
  } catch (err) {
    next(err);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json(`Customer ${req.params.id} deleted.`);
  } catch (err) {
    next(err);
  }
};

export const getCustomer = async (req, res, next) => {
  try {
    const user = await Customer.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    const users = await Customer.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
