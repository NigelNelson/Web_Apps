// Class: SE2840 - Bus Speed Tracker
// Name: Nigel Nelson
// Class Section: 021

// Import the express library
const express = require('express');

// Create a new express application
const app = express();

const mongoose = require('mongoose'); // MongoDB API for Node.js

const webpagedir = `${__dirname}/srv`; // Location front

// connect to the database named "bustracker" on the local mongo server
mongoose.connect('mongodb://localhost/bustracker', {useNewUrlParser: true, useUnifiedTopology: true});

// A schema describes the format/structure of the documents in the bus Collection
const busSchema = new mongoose.Schema({
    'rt': String,
    'vid': String,
    'spd': Number,
    'tmstmp': String,
    'lat': String,
    'lon': String
});

// Bus model represents a document in a database collection
const BusModel = mongoose.model('Bus', busSchema);

// Instruct the app to listen on port 3000
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});

// Set a static route for root (/) to send BusSpeedChecker.html
app.get("/", (request, response) => {
    response.sendFile(`${webpagedir}/BusSpeedChecker.html`);
});

// Set a static route for all resources that don't have an explicit route
// to use the static directory webpagedir
app.use(express.static(webpagedir));

// End point for when a speed is entered by the user to search for matching bus data points
app.get("/BusSpeed", (request, response) => {
    try{
        let value = request.query.spd;
        // Check that the entered value is not empty
        if(!value){
            throw Error("Speed cannot be empty");
        }

        const speed = parseInt(value);

        // Check that speed is a number and greater than 0
        if(isNaN(speed) || speed <= 0){
            throw Error("Speed must be a positive integer > 0")
        }

        // Check that speed is an integer
        if(!Number.isInteger(parseFloat(value))) {
            throw Error("Speed cannot be a floating point number");
        }

        // Find all the buses with speeds >= the specified speed
        BusModel.find({spd: {$gte: speed}}).then( function (busInfo) {
            response.json({
                status: "success",
                result: busInfo,
                speed: speed,
            });
        }).catch( function(err){
            response.json({
                status: "error",
                message: "Error accessing bus database with specified speed",
            });
        });

    } catch (error){
        response.json({
            status: "error",
            message: error.message
        });
    }
});


// Respond with a 404 not found error if a requested file does not exist
app.use(function(req, res, next) {
    res.status(404).send("HTTP 404 Not Found");
});