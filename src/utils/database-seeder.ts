import * as fs from 'fs';
import {ILocation, LocationModel} from "../models/location";
import {ProfileModel} from "../models/profile";
import {GroupModel, IGroup} from "../models/group";
import {IParticipant, ParticipantModel} from "../models/participant";
import mongoose from "mongoose";

async function createLocations(locations: any[]) {
    try {
        await LocationModel.insertMany(locations)
            .then(() => console.log('created locations'))
    } catch (error) {
        console.error('Error seeding locations:', error);
        throw error;
    }
}

async function createProfiles(people: any[]) {
    try {
        await ProfileModel.insertMany(people)
            .then(() => console.log('Created profiles'))
    } catch (error) {
        console.error('Error seeding profiles:', error);
        throw error;
    }
}

async function createGroups(people: any[]) {
    try {
        const groupMap = new Map<string, IParticipant[]>()

        people.forEach(person => {
            const participant = new ParticipantModel(person)

            ProfileModel.findOne({ email: person.email }).exec().then((profile) => {
                if (profile) {
                    participant.profile = profile.id
                }
                return participant

            }).catch((error) => {
                // continue
            })

            const groupNames = person.groups || []
            groupNames.forEach((groupName: string) => {
                if (!groupMap.has(groupName)) {
                    groupMap.set(groupName, [])
                }
                groupMap.get(groupName)!.push(participant)
            })
        })

        const newGroups : IGroup[] = []
        groupMap.forEach((participants, groupName) => {
            const newGroup = new GroupModel({
                name: groupName,
                participants: participants})
            // console.log(`Created group ${groupName} with ${participants}`)
            newGroups.push(newGroup)
        })

        await GroupModel.create(newGroups)
            .then(() => console.log(`Created ${newGroups.length} groups`))

        // await GroupModel.insertMany(newGroups)
        //     .then(() => console.log(`Created ${newGroups.length} groups`))

    } catch (error) {
        console.error('Error seeding groups:', error);
        throw error;
    }
}

async function seedDatabase() {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("Please add the MONGO_URL environment variable");
        }

        await mongoose.connect(process.env.MONGO_URL);

// Read the JSON file
        const locations: any[] = JSON.parse(fs.readFileSync('data/locations.json', 'utf8'));
        const people: any[] = JSON.parse(fs.readFileSync('data/people.json', 'utf8'));

        await ProfileModel.deleteMany({})
            .then(() =>  console.log('Removed profiles'))
        await LocationModel.deleteMany({})
            .then(() => console.log('Removed locations'))
        await GroupModel.deleteMany({})
            .then(() => console.log('Removed groups'))

        await createProfiles(people)
        await createGroups(people)
        await createLocations(locations)

    } catch(error) {
        console.log(`Error ${error} seeding`)
    } finally {
        await mongoose.disconnect()
    }

}

seedDatabase().then(() => {
    // mongoose.disconnect().then(() => {})
    // process.exit(0)
})
