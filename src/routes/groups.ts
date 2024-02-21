import { Router } from "express";
import { GroupModel, IGroup } from "../models/group";

const routes = Router();

routes.get("/", async (req, res) => {
    try {
        const groups: IGroup[] = await GroupModel.find().exec();
        return res.json(groups);
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
