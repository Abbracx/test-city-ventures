// Dependencies imports
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { sign, Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";

// Application Imports
import { User } from "../models/user.model";
import { IUser } from "../helpers/interfaces";
import { handleErrors } from "../helpers/errorHandler";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as Secret;

// Create User controller
export const register = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const body = req.body;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(body.password, salt);

    // Create User and return response
    const user = new User({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      isAdmin: body.isAdmin,
      interest: body.interest,
      password: hashedPassword,
    });
    const result = await user.save();
    const { password, ...data } = result.toJSON();

    return res.status(201).send(data);
  } catch (error) {
    const errors = handleErrors(error);
    return res.status(400).send(errors);
  }
};

// Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ message: "invalid credentials..." });
    }

    const auth = await bcryptjs.compare(req.body.password, user.password);
    if (!auth) {
      return res.status(400).send({ message: "invalid credentials..." });
    }

    const token = sign({ email: user.email }, JWT_SECRET);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).send({ message: "success" , token});
  } catch (error) {
    const errors = handleErrors(error);
    return res.send(errors);
  }
};

// Get User controller
export const user = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.user?.email });

    const { password, ...data } = (user as IUser).toJSON();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send({ message: "unauthenticated" });
  }
};

// Logout controller
export const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send({ message: "Successfully logged out" });
};
