import { Router } from "express";
import { ContactModel, IContact } from "../models/contact";

const routes = Router();

routes.get("/", async (req, res) => {
    try {
        const contacts: IContact[] = await ContactModel.find().exec();
        return res.json(contacts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
});

routes.get("/:id", async (req, res) => {
    try {
        const id = req.params['id']
        const contact = await ContactModel.findOne({ _id: id }).exec();
        if (contact) {
            return res.json(contact);
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
        const contact: IContact = req.body;

        // const contactExists = await ContactModel.findOne({
        //     name: contact.name,
        // }).exec();
        //
        // if (contactExists) {
        //     return res
        //         .status(409)
        //         .json({ error: "There is already another contact with this name" });
        // }

        const newContact = await ContactModel.create(contact);
        return res.status(201).json(newContact);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
});

export default routes;
