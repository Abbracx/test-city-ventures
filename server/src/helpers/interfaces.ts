import { Document, Types } from "mongoose";

export interface IReset {
  email: string;
  token: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  interest: Types.Array<string>;
  email: string;
  isAdmin: boolean;
  password: string;
}


export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  address: string;
  isVirtual: boolean;
  category: string;
  host: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}