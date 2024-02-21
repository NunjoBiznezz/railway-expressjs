import {Document, model, Schema} from "mongoose";
import {AddressSchema, IAddress} from "./address";
import {IPerson} from "./person";

interface IContact extends IPerson, Document {
    phone?: string;
    phoneVerified?: boolean;
    email?: string;
    emailVerified?: boolean;
    birthDate?: Date;
    address?: IAddress;
}


const ContactSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: false
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
        type: AddressSchema,
        required: false,
    },
    birthDate: {
        type: Date,
        required: false
    }
})

const ContactModel = model<IContact>("Contact", ContactSchema)

export { ContactModel, IContact }
