import {ITemplate} from "../interfaces/models";
import * as mongoose from "mongoose";


export const TemplateSchema = mongoose.Schema({
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
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export const Template = mongoose.model<ITemplate>('Template', TemplateSchema);