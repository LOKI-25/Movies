import Admin from "../models/Admin.js";

export const createAdmin = async (req, res, next) => {
  const newAdmin = new Admin(req.body);
  try {
    const savedAdmin = await newAdmin.save();
    res.status(200).json(savedAdmin);
  } catch (err) {
    next(err);
  }
};

export const updateAdmin = async (req, res, next) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedAdmin);
  } catch (err) {
    next(err);
  }
};

export const deleteAdmin = async (req, res, next) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json(`Admin ${req.params.id} deleted.`);
  } catch (err) {
    next(err);
  }
};

export const getAdmin = async (req, res, next) => {
  try {
    const user = await Admin.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAdmins = async (req, res, next) => {
  try {
    const users = await Admin.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
