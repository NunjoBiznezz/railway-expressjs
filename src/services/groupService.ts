import { GroupModel, IGroup } from "../models/group";
import {IParticipant} from "../models/participant";
import {PagedResult} from "./paged-result";
import {IPageRequest} from "./page-request";
import {parseSortString} from "./sort-criteria";

const groupService = {

    /**
     * Return all groups matching the profile id
     * @param profileId Logged in user's profile
     */
    async findGroups(profileId: string, options?: IPageRequest) {
        try {
            let pageOption = options?.page || 0
            let sizeOption = options?.size || 10
            let sortOption = parseSortString(options?.sort)

            let matchCriteria = GroupModel.where({ 'participants.profile': profileId })

            const count = await matchCriteria.countDocuments().exec();
            if (count > 0) {
                let query = GroupModel.find({ 'participants.profile': profileId })
                if (options?.sort && options.sort.length) {
                    query = query.sort(sortOption)
                }
                if (options?.page && options?.size) {
                    query = query.skip(pageOption * sizeOption)
                }
                query = query.limit(sizeOption)

                const groups = await query.exec();

                return new PagedResult<IGroup>({
                    page: pageOption,
                    size: sizeOption,
                    totalItems: count,
                    items: groups
                })

            } else {
                return new PagedResult<IGroup>({
                    page: pageOption,
                    size: sizeOption,
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
