import "../lib/db";
import * as fs from 'fs';
import {ILocation, LocationModel} from "../models/location";
import {ProfileModel} from "../models/profile";
import {GroupModel, IGroup} from "../models/group";

function createLocations(locations: any[]) {
    LocationModel.insertMany(locations)
        .then(() => {
            console.log('Locations seeded successfully');
            // mongoose.connection.close();
        })
        .catch((err) => {
            console.error('Error seeding locations:', err);
            // mongoose.connection.close();
        });
}

function createProfiles(people: any[]) {
    ProfileModel.insertMany(people)
        .then(() => {
            console.log('Profiles seeded successfully');
            // mongoose.connection.close();
        })
        .catch((err) => {
            console.error('Error seeding profiles:', err);
            // mongoose.connection.close();
        });
}

function createGroups(people: any[]) {

    let groups = new Map<string, IGroup>()

    people.forEach(person => {
        if (person.groups) {
            person.groups.forEach((groupName : string) => {
                let group = groups.get(groupName)
                if (!group) {
                    group = new GroupModel({ name: groupName, participants: [] })
                    groups.set(groupName, group)
                }
                // const participant = {
                //     firstName: person.firstName,
                //     lastName: person.lastName,
                //     nickname: person.nickname,
                //     phone: person.phone,
                //     email:person.email
                // }
                group.participants.push(person)
            })
        }
    })

    GroupModel.insertMany(groups.values())
        .then(() => {
            console.log('Groups seeded successfully');
            // mongoose.connection.close();
        })
        .catch((err) => {
            console.error('Error seeding groups:', err);
            // mongoose.connection.close();
        });


}

// Read the JSON file
const locations: any[] = JSON.parse(fs.readFileSync('data/locations.json', 'utf8'));
const people: any[] = JSON.parse(fs.readFileSync('data/people.json', 'utf8'));

ProfileModel.deleteMany().then(() => { console.log('Removed profiles') })
LocationModel.deleteMany().then(() => { console.log('Removed locations') })
GroupModel.deleteMany().then(() => { console.log('Removed groups') })

createProfiles(people)
createGroups(people)
createLocations(locations)

console.log('Database seeded successfully');

process.exit(0)

