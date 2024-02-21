import {Document, model, Schema} from "mongoose";
import {addressSchema, IAddress} from "./address";
import {IPerson} from "./person";

interface IProfile extends IPerson, Document {
    username: string;
    phone?: string;
    phoneVerified?: boolean;
    email?: string;
    emailVerified?: boolean;
    birthDate?: Date;
    address?: IAddress;
}

const profileSchema = new Schema({
    username: {
        type: String,
        required: false // DEB ??
    },
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
        type: addressSchema,
        required: false,
    },
    birthDate: {
        type: Date,
        required: false
    }
})

const ProfileModel = model<IProfile>("Profile", profileSchema)

export { ProfileModel, IProfile }
