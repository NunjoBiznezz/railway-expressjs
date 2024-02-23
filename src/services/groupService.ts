import { GroupModel, IGroup } from "../models/group";
import {IParticipant} from "../models/participant";
import {PagedResult} from "./paged-result";
import {IPageRequest} from "./page-request";

const groupProjection = {
    path: 'participants',
    select: 'profile firstName middleName lastName'
};


const groupService = {

    /**
     * Return all groups matching the profile id
     * @param profileId Logged in user's profile
     */
    async findGroups(profileId: string, options?: IPageRequest) {
        try {
            let page = options?.page || 0
            let size = options?.size || 10

            let matchCriteria = GroupModel.where({ 'participants.profile': profileId })

            const count = await matchCriteria.countDocuments().exec();
            if (count > 0) {
                let query = GroupModel.find({ 'participants.profile': profileId })
                if (options?.sort) {
                    query = query.sort(options.sort)
                }
                if (options?.page && options?.size) {
                    query = query.skip(page * size)
                }
                query = query.limit(size)

                const groups = await query.exec();

                return new PagedResult<IGroup>({
                    page: page,
                    size: size,
                    totalItems: count,
                    items: groups
                })

            } else {
                return new PagedResult<IGroup>({
                    page: page,
                    size: size,
                    totalItems: 0,
                    items: []
                })
            }

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
