import {Schema, model} from "mongoose";
import {userEmailValidator} from "./user";
import {ISession} from "../interfaces/models";

export const SessionSchema = Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate: userEmailValidator
    }
});

export const Session = model<ISession>('Session', SessionSchema);