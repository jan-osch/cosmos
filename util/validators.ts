import * as mongoose from "mongoose";

export function validateId(id:string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid ObjectId`)
    }
}