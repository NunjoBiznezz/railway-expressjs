import "../lib/db";
import * as fs from 'fs';
import {ILocation, LocationModel} from "../models/location";
import {ProfileModel} from "../models/profile";
import {GroupModel, IGroup} from "../models/group";

async function createLocations(locations: any[]) {
    try {
        await LocationModel.insertMany(locations)
    } catch (error) {
        console.error('Error seeding locations:', error);
    }
}

async function createProfiles(people: any[]) {
    try {
        await ProfileModel.insertMany(people)
    } catch (err) {
        console.error('Error seeding profiles:', err);
        // mongoose.connection.close();
    }
}

async function createGroups(people: any[]) {
    try {
        const groups = new Map<string, any>()

        people.forEach(person => {
            // console.log(`Processing ${person.firstName} ${person.lastName}`)
            if (person.groups) {
                person.groups.forEach((groupName: string) => {
                    let group = groups.get(groupName)
                    if (group) {
                        // console.log(`${person.firstName} ${person.lastName} added to group "${groupName}"`)
                        group.participants.push(person)
                    } else {
                        // console.log(`${person.firstName} ${person.lastName} added to new group "${groupName}"`)
                        groups.set(groupName, {
                            name: groupName,
                            participants: [ person ]}
                        )
                    }
                    // const participant = {
                    //     firstName: person.firstName,
                    //     lastName: person.lastName,
                    //     nickname: person.nickname,
                    //     phone: person.phone,
                    //     email:person.email
                    // }
                    // console.log(`${person.firstName} ${person.lastName} added to group "${groupName}"`)
                })
            }
        })

        const newGroups = [...groups.values()];

        // console.log('Groups: ', JSON.stringify(newGroups))

    // newGroups.forEach(group => {
    //     console.log('Group: ', JSON.stringify(group))
    // })

        await GroupModel.insertMany(newGroups)
    } catch (err) {
        console.error('Error seeding groups:', err);
    }
}

async function seedDatabase() {
// Read the JSON file
    const locations: any[] = JSON.parse(fs.readFileSync('data/locations.json', 'utf8'));
    const people: any[] = JSON.parse(fs.readFileSync('data/people.json', 'utf8'));

    await ProfileModel.deleteMany({}).then(() => {
        console.log('Removed profiles')
    })
    await LocationModel.deleteMany({}).then(() => {
        console.log('Removed locations')
    })
    await GroupModel.deleteMany({}).then(() => {
        console.log('Removed groups')
    })

    await createProfiles(people).then(() => { console.log('Created profiles')})
    await createGroups(people).then(() => {console.log('Created groups')})
    await createLocations(locations).then(() => { console.log('Created locations')})
}

seedDatabase().then(() => {
    process.exit(0)

})


