import {Document, model, Schema} from "mongoose";
import {IParticipant, ParticipantSchema} from "./participant";

interface IGroup extends Document {
    name: string;
    description?: string
    participants: Array<IParticipant>
}

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    participants: [{
        type: ParticipantSchema,
        required: false
    }]
})

const GroupModel = model<IGroup>("Group", GroupSchema)

export { GroupModel, IGroup }
