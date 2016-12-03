import {Document} from "mongoose";

export interface IUser extends Document {
    _id:string;
    name:string;
    password:string;
    email:string;
}

export interface ITaskPrototype extends Document {
    _id:string;
    author:string|IUser;
    title:string;
    content:string;
}

export interface ISession extends Document {
    _id:string;
    email:string;
}