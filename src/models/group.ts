import {Document, model, Schema} from "mongoose";
import {IParticipant, participantSchema} from "./participant";

interface IGroup extends Document {
    name: string;
    description?: string
    participants: IParticipant[]
}

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    participants: [{
        type: participantSchema,
    }]
})

const GroupModel = model<IGroup>("Group", groupSchema)

export { GroupModel, IGroup }
