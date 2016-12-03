import * as mongoose from "mongoose";
import * as crypto from "crypto";
import {IUser} from "../interfaces/models";

export const userEmailValidator = {
    validator: validateEmail,
    message: 'Email must be a real email'
};

export const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: userEmailValidator
    }
});

UserSchema.pre('save', (next)=> {
    this.password = createPasswordHash(this.password);
    next()
});

export function createPasswordHash(password):string {
    return crypto.createHash('sha256')
        .update(password)
        .digest('hex');
}

function validateEmail(email:string):boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const User = mongoose.model<IUser>('User', UserSchema);