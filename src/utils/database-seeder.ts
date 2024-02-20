import "../lib/db";
import * as fs from 'fs';
import {ILocation, LocationModel} from "../models/location";

// Connect to MongoDB
// Define Mongoose schema and model
// Read the JSON file
const data: any[] = JSON.parse(fs.readFileSync('data/locations.json', 'utf8'));


// console.log(LocationModel.schema)

// data.forEach(location => {
//     // console.log(location.address satisfies ILocation)
//     console.log(location.address)
// })

// Seed the database
LocationModel.deleteMany().then(() =>
{
    console.log('Deleted all locations')

    LocationModel.insertMany(data)
        .then(() => {
            console.log('Database seeded successfully');
            // mongoose.connection.close();
        })
        .catch((err) => {
            console.error('Error seeding database:', err);
            // mongoose.connection.close();
        });
})

