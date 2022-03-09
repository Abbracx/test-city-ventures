import { Schema, model } from 'mongoose';
import { IUser } from '../helpers/interfaces';


const schema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  interest : [{ type: String }],
  isAdmin : { type: Boolean},
  password: { type: String, required: true },

});

export const User = model<IUser>('User', schema);