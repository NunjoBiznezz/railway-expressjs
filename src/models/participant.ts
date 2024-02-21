import {Document, model, Schema} from "mongoose";
import {AddressSchema, IAddress} from "./address";
import {IPerson} from "./person";


interface IParticipant extends IPerson, Document {
    profile?: string;
    phone?: string;
    phoneVerified?: boolean;
    email?: string;
    emailVerified?: boolean;
}

const ParticipantSchema = new Schema({
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
})

export { IParticipant, ParticipantSchema }
