import { GroupModel, IGroup } from "../models/group";
import {IParticipant} from "../models/participant";

const groupProjection = {
    path: 'participants',
    select: 'profile firstName middleName lastName'
};


const groupService = {

    /**
     * Return all groups matching the profile id
     * @param profileId Logged in user's profile
     */
    async findGroups(profileId: string, options?: { sort?: any, skip?: number, limit?: number }) {
        try {
            let query = GroupModel.find({ 'participants.profile': profileId })
            if (options?.sort) {
                query = query.sort(options.sort)
            }
            if (options?.skip) {
                query = query.skip(options.skip)
            }
            query = query.limit(options?.limit || 100)
            const groups = query.exec();
            return groups
        } catch (error) {
            console.error(error);
            throw new Error('Error finding groups for ${profileId}: ${error}')
        }
    },

    async findGroup(profileId: string, id: string) : Promise<IGroup | null> {
        try {
            const group = await GroupModel
                .findOne({_id: id})
                .sort({ "participants.firstName": "asc", "participants.lastName": "asc" })
                // .populate('participants.profile')
                .exec();
            return group || null
        } catch (error) {
            console.error(error);
            throw new Error(`Error finding group ${id}: ${error}`)
        }
    },

    async findParticipants(profileId: string, id: string) : Promise<IParticipant[]> {
        try {
            const group = await this.findGroup(profileId, id)
            return group?.participants || []
        } catch (error) {
            console.error(error);
            throw new Error(`Error finding group ${id}: ${error}`)
        }
    }

}

export default groupService;
