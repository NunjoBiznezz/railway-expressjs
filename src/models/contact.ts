import {Document, model, Schema, Types} from "mongoose";
import {addressSchema, IAddress} from "./address";
import {IPerson} from "./person";

interface IContact extends IPerson, Document {
    _owner: Types.ObjectId;
    _profile: Types.ObjectId;
    phone?: string;
    phoneVerified?: boolean;
    email?: string;
    emailVerified?: boolean;
    birthDate?: Date;
    address?: IAddress;
}


const contactSchema = new Schema({
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    _profile: {
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
        type: addressSchema,
        required: false,
    },
    birthDate: {
        type: Date,
        required: false
    }
})

const ContactModel = model<IContact>("Contact", contactSchema)

export { ContactModel, IContact }
