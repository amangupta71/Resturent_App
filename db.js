const mongoose = require('mongoose');
require('dotenv').config({ quiet: true });

const mongoURL = process.env.DB_URL_GLOBAL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.log('Error connecting to MongoDB:', err);
}); 
db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

module.exports = db;