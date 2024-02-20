import {Document, model, Schema} from "mongoose";
import {AddressSchema, IAddress} from "./address";

interface IProfile extends Document {
    username: string;
    firstName?: string;
    lastName?: string;
    nickname?: string;
    phone?: string;
    phoneVerified?: boolean;
    email?: string;
    emailVerified?: boolean;
    birthDate?: Date;
    address?: IAddress;
}

const ProfileSchema = new Schema({
    username: {
        type: String,
        required: false // DEB ??
    },
    firstName: {
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
    phone: {
        type: String,
        required: false
    },
    phoneVerified: {
        type: Boolean,
        required: false,
        default: false
    },
    email: {
        type: String,
        required: false
    },
    emailVerified: {
        type: Boolean,
        required: false,
        default: false
    },
    address: {
        type: AddressSchema,
        required: false,
    },
    birthDate: {
        type: Date,
        required: false
    }
})

const ProfileModel = model<IProfile>("Profile", ProfileSchema)

export { ProfileModel, IProfile }
