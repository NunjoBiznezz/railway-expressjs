import "../lib/db";
import * as fs from 'fs';
import {ILocation, LocationModel} from "../models/location";
import {ProfileModel} from "../models/profile";

function createLocations(data: any[]) {

    // Seed the database
    LocationModel.deleteMany().then(() =>
    {
        console.log('Deleted all locations')

        LocationModel.insertMany(data)
            .then(() => {
                console.log('Locations seeded successfully');
                // mongoose.connection.close();
            })
            .catch((err) => {
                console.error('Error seeding database:', err);
                // mongoose.connection.close();
            });
    })
}

function createProfiles(people: any[]) {
    // Read the JSON file

    // Seed the database
    ProfileModel.deleteMany().then(() =>
    {
        console.log('Deleted all profiles')

        ProfileModel.insertMany(people)
            .then(() => {
                console.log('Profiles seeded successfully');
                // mongoose.connection.close();
            })
            .catch((err) => {
                console.error('Error seeding database:', err);
                // mongoose.connection.close();
            });
    })
}

// Read the JSON file
const locations: any[] = JSON.parse(fs.readFileSync('data/locations.json', 'utf8'));
const people: any[] = JSON.parse(fs.readFileSync('data/people.json', 'utf8'));

createProfiles(people)
createLocations(locations)

console.log('Database seeded successfully');

process.exit(0)

