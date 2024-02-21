import {Document, Schema} from "mongoose";

interface IPerson extends Document {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    nickname?: string;
}

const personSchema = new Schema({
    firstName: {
        type: String,
        required: false
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    nickname: {
        type: String,
        required: false
    },
})

export { IPerson, personSchema }
