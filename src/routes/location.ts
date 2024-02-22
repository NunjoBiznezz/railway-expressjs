import { Router } from "express";
import {ILocation, LocationModel} from "../models/location";

const routes = Router();

routes.get("/", async (req, res) => {
    try {
        const locations: ILocation[] = await LocationModel.find().exec();
        return res.json(locations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
});

routes.get("/:id", async (req, res) => {
    try {
        const id = req.params['id']
        const location = await LocationModel.findOne({ _id: id }).exec();
        if (location) {
            return res.json(location);
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
        const Location: ILocation = req.body;

        // const LocationExists = await LocationModel.findOne({
        //     name: Location.name,
        // }).exec();
        //
        // if (LocationExists) {
        //     return res
        //         .status(409)
        //         .json({ error: "There is already another location with this name" });
        // }

        const newLocation = await LocationModel.create(Location);
        return res.status(201).json(newLocation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
});


export default routes;
