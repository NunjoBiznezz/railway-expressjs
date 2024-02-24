import { GroupModel, IGroup } from "../models/group";
import {IParticipant} from "../models/participant";
import {PagedResult} from "./paged-result";
import {IPageRequest} from "./page-request";
import {parseSortString} from "./sort-criteria";
import {PipelineStage, Types} from "mongoose";

const groupService = {

    /**
     * Return all groups matching the profile id
     * @param profileId Logged in user's profile
     */
    async findGroups(profileId: string, options?: IPageRequest) : Promise<PagedResult<IGroup>> {
        try {
            let pageOption = options?.page || 0
            let sizeOption = options?.size || 10
            let sortOption = parseSortString(options?.sort)

            let matchCriteria = { 'participants.profile': profileId }

            const count = await GroupModel.where(matchCriteria).countDocuments().exec();
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

    async findGroup(profileId: string, groupId: string) : Promise<IGroup | null> {
        try {
            // Letting mongodb assert that the profile exists in the group
            let matchCriteria = { _id: groupId, 'participants.profile': profileId }

            const group = await GroupModel
                .findOne(matchCriteria)
                .exec();
            return group || null
        } catch (error) {
            console.error(error);
            throw new Error(`Error finding group ${groupId}: ${error}`)
        }
    },

    async findParticipants(profileId: string, groupId: string) {
        try {
            let group = await this.findGroup(profileId, groupId)
            return group?.participants || []
        } catch (error) {
            console.error(error);
            throw new Error(`Error finding group participants ${groupId}: ${error}`)
        }
    }

}

export default groupService;
