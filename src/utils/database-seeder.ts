import * as fs from 'fs';
import {LocationModel} from "../models/location";
import {ProfileModel} from "../models/profile";
import {GroupModel, IGroup} from "../models/group";
import {ParticipantModel} from "../models/participant";
import mongoose from "mongoose";
import {first, from} from "rxjs";

// The people.json file looks like this
interface IPeopleJson {
    firstName: string;
    lastName : string;
    phone?: string;
    email?: string;
    handicap?: number;
    groups?: string[]
}

// The locations.json file looks like this:
interface ILocationsJson {
    name: string;
    managed?: boolean;
    tees?: any[]
    address?: {
        street?: string;
        street2?: string;
        city?: string;
        state?: string;
        postalCode?: string
    }
    website?: string;
    twitterHandle?: string;
    facebookHandle?: string;
    instagramHandle?: string;
    phone?: string;
    _class?: string;
}

/**
 * Create locations from the seed data
 * @param locations data from locations.json
 */
async function createLocations(locations: ILocationsJson[]) {
    try {
        await LocationModel.insertMany(locations)
            .then(() => console.log('created locations'))
    } catch (error) {
        console.error('Error seeding locations:', error);
        throw error;
    }
}

/**
 * Create profiles with the seed data
 * @param people seed data from people.json
 */
async function createProfiles(people: IPeopleJson[]) {
    try {
        await ProfileModel.insertMany(people)
            .then(() => console.log('Created profiles'))
    } catch (error) {
        console.error('Error seeding profiles:', error);
        throw error;
    }
}

/**
 * Create groups with the seed data
 * @param people seed data from people.json
 */
async function createGroups(people: IPeopleJson[]) {
    try {
        const groupMap = await createGroupMap(people)
        const profiles = await ProfileModel.find({}).exec()
        const profiles$ = from(profiles)

        const newGroups : IGroup[] = []

        groupMap.forEach((people, groupName) => {

            // Get the list of participants
            const participants = people.map(person => {
                const participant = new ParticipantModel(person)

                // Locate matching profile
                profiles$.pipe(first(profile => person.email === profile.email))
                    .subscribe({
                        next: profile => {
                            participant.profile = profile._id
                        }
                    })

                return participant;
            })

            const newGroup = new GroupModel({
                name: groupName,
                participants: participants})

            newGroups.push(newGroup)
        })

        // newGroups.forEach(group => {
        //     console.log(`Created group ${group.name}`)
        //     group.participants.forEach(participant => {
        //         console.log('Participant: ', JSON.stringify(participant))
        //     })
        // })

        await GroupModel.create(newGroups)
            .then(() => console.log(`Created ${newGroups.length} groups`))

    } catch (error) {
        console.error('Error seeding groups:', error);
        throw error;
    }
}

/**
 * Create a hashmap with the group names and list of people in each group
 * @param people
 */
async function createGroupMap(people: IPeopleJson[]) {
    const groupMap = new Map<string, IPeopleJson[]>()

    people.forEach(person => {
        const groupNames = person.groups || []
        groupNames.forEach((groupName: string) => {
            if (!groupMap.has(groupName)) {
                groupMap.set(groupName, [])
            }
            groupMap.get(groupName)!.push(person)
        })
    })

    return groupMap
}

/**
 * Seed the database, must be in a function to allow await calls... (as far as I know)
 */
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
    console.log('FIN')
})
