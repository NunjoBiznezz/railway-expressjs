import { Router } from "express";
import {IProfile, ProfileModel} from "../models/profile";

const routes = Router();

routes.get("/", async (req, res) => {
    try {
        const profiles: IProfile[] = await ProfileModel.find().exec();
        return res.json(profiles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
});

routes.post("/", async (req, res) => {
    try {
        const Profile: IProfile = req.body;

        // const ProfileExists = await ProfileModel.findOne({
        //     name: Profile.name,
        // }).exec();
        //
        // if (ProfileExists) {
        //     return res
        //         .status(409)
        //         .json({ error: "There is already another profile with this name" });
        // }

        const newProfile = await ProfileModel.create(Profile);
        return res.status(201).json(newProfile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
});


export default routes;
