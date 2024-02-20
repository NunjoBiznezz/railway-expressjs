import {Document, Schema} from "mongoose";

interface IAddress extends Document {
    street?: string;
    street2?: string;
    city: string;
    state: string;
    postalCode?: string;
}

const AddressSchema = new Schema({
    street: {
        type: String,
        required: false
    },
    street2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: false
    },

});

export { IAddress, AddressSchema }
