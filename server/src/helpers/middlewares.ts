import { Request, Response, NextFunction } from "express";
import {
  JwtPayload,
  sign,
  verify,
  Secret,
  GetPublicKeyOrSecret,
} from "jsonwebtoken";
import * as dotenv from "dotenv";

import { registerValidation, loginValidation, eventValidation } from "../helpers/validators";
import { User } from "../models/user.model";
import { IUser } from "./interfaces";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as Secret;

// Authentication Middleware
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check json web token exists & is verified
      const token = req.cookies.jwt;
      const payload = verify(token, JWT_SECRET);

      if (!payload) res.status(400).send({ message: "unauthenticated" });
      
        const user = await User.findOne({ email: (payload as JwtPayload).email });

        if(!user){
            res.status(400).send({ message: "unauthenticated" });
        }

        req.user = user 

      next();
    } catch (error) {
         res.status(400).send({ message: "unauthenticated" });
    }

};

//  Permission Middleware
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check json web token exists ,is verified and user is admin
    const token = req.cookies.jwt;
    const payload = verify(token, JWT_SECRET);

    if (!payload) return res.status(403).send({ message: "unAuthorized" });

    const user = await User.findOne({email: (payload as JwtPayload).email})

    if(!(user as IUser).isAdmin) return res.status(403).send({ message: "unAuthorized" });

    req.user = user as IUser;

    next();
  } catch (error) {
    res.status(400).send({ message: "unAuthorized" });
    return
  }
};

// Validation middleware :  Registration
export const registrationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const body = req.body;
  const { error } = registerValidation.validate(body);

  if (error) return res.status(400).send(error.message);

  if (body.password !== body.password_confirm)
    return res.status(400).send("password's do not match.");

  next();
};

// Validation middleware: Login
export const loginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const body = req.body;
  const { error } = loginValidation.validate(body);

  if (error) return res.status(400).send(error.message);

  next();
};

export const eventMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { error } = eventValidation.validate(body);

    if (error) return res.status(400).send(error.message);

    next();
};
