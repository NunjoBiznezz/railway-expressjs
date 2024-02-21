import {Document, model, Schema, Types} from "mongoose";
import {IPerson} from "./person";


interface IParticipant extends IPerson, Document {
    profile?: string;
    phone?: string;
    phoneVerified?: boolean;
    email?: string;
    emailVerified?: boolean;
}

const participantSchema = new Schema({
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

const ParticipantModel = model<IParticipant>('Participant', participantSchema)

export { IParticipant, participantSchema, ParticipantModel }
