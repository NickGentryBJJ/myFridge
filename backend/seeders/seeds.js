const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
// const { faker } = require('@faker-js/faker');
require('dotenv').config();

// const NUM_SEED_USERS = 10;

// Create users
const users = [];

users.push(
    new User ({
        username: 'demo-user',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password', 10)
    })
)

// for (let i = 1; i < NUM_SEED_USERS; i++) {
//     const firstName = faker.person.firstName();
//     const lastName =  faker.person.lastName();
//     users.push(
//         new User ({
//             username: faker.internet.userName({firstName, lastName}),
//             email: faker.internet.email({firstName, lastName}),
//             hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
//     })
//     )
// }

// const mongoURI = 'mongodb+srv://admin:LyAIo0ofwieIPXJE@mern.ddxzvcp.mongodb.net/?retryWrites=true&w=majority';
// Connect to database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        // console.log('Connected to MongoDB successfully');
        insertSeeds();
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });


    const insertSeeds = () => {

        User.collection.drop()
                        .then(() => User.insertMany(users))
                        .then(() => {
                            // console.log("Done!");
                            mongoose.disconnect();
                        })
                        .catch(err => {
                            console.error(err.stack);
                            process.exit(1);
                        });
    }
