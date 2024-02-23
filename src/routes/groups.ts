import { Router } from "express";
import { GroupModel, IGroup } from "../models/group";
import groupService from '../services/groupService'
import {PagedResult} from "../services/paged-result";
const routes = Router();

// TODO need auth!
const profileId: string = '65d651fb0bdde2d1399a4bef'

routes.get("/", async (req, res) => {
    try {
        let pageOption = parseInt(req.query?.page as string) || 0
        let sizeOption = parseInt(req.query?.size as string) || 10
        let sortOption = req.query?.sort as string || undefined

        const groups = await groupService.findGroups(profileId,
            { sort: sortOption, page: pageOption * sizeOption, size: sizeOption }
        )
        return res.json(groups);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
});

routes.get("/:id", async (req, res) => {
    try {
        const id = req.params['id']
        const group = await groupService.findGroup(profileId, id);
        if (group) {
            return res.json(group);
        } else {
            return res.status(404).json({ error: "Not found :/" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
});

/**
 * Get group participants
 */
routes.get("/:id/participants", async (req, res) => {
    try {
        const id = req.params['id']
        const participants = await groupService.findParticipants(profileId, id);
        if (participants) {
            return res.json(participants);
        } else {
            return res.status(404).json({ error: "Not found :/" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
});


routes.post("/", async (req, res) => {
    try {
        const group: IGroup = req.body;

        // const groupExists = await GroupModel.findOne({
        //     name: group.name,
        // }).exec();
        //
        // if (groupExists) {
        //     return res
        //         .status(409)
        //         .json({ error: "There is already another group with this name" });
        // }

        const newGroup = await GroupModel.create(group);
        return res.status(201).json(newGroup);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
});

export default routes;
