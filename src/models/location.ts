import {model, Schema, Document, ObjectId} from "mongoose";
import {AddressSchema, IAddress} from "./address";

interface ILocation extends Document {
    name: string;
    managed?: boolean;
    twitterHandle?: string;
    facebookHandle?: string;
    instagramHandle?: string;
    website?: string;
    address?: IAddress;
}

const LocationSchema = new Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    managed: {
        type: Boolean,
        required: false
    },
    address: {
        type: AddressSchema,
        required: false,
    },
    twitterHandle: {
        type: String,
        required: false
    },
    facebookHandle: {
        type: String,
        required: false
    },
    instagramHandle: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    }
})

const LocationModel = model<ILocation>("Location", LocationSchema)

export { LocationModel, ILocation }
