import * as mongoose from "mongoose";
import {ITaskPrototype} from "../interfaces/models";


export const TaskPrototypeSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});


export const TaskPrototype = mongoose.model<ITaskPrototype>('Task', TaskPrototypeSchema);