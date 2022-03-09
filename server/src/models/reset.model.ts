import { Schema, model } from "mongoose";
import { IReset } from "../helpers/interfaces";


const schema = new Schema<IReset>({
    email: { type: String, required: true },
    token: { type: String, unique: true, required: true  }
});

export const ResetModel = model<IReset>('Reset', schema)
