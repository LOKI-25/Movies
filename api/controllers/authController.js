import Customer from "../models/Customer.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newCustomer = new Customer({
      email: req.body.email,
      phone: req.body.phone,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      dob: req.body.dob,
      password: hash,
    });
    await newCustomer.save();
    res.status(200).send(`Customer ${req.body.email} has been created.`);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await Customer.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, `Customer ${req.body.email} not found!`));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return next(
        createError(400, `Wrong password or email for ${req.body.email}`),
      );
    }

    // openssl rand -base64 32 - UDTrVo8zzeQpf6mhgYyWEZB6ScDwUvCv4OFqSY3uGY8=
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
    );

    // destructure
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherDetails);
  } catch (err) {
    next(err);
  }
};
