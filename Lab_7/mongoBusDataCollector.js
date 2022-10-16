/**
 * MongoBusCollector
 *   Collects bus data from the MCTS every 15 seconds and stores the results in a mongo database
 *
 * To use mongo, follow the instructions given to install and setup MongoDB
 *
 * To use this script:
 * 1. npm init
 * 2. npm install mongoose
 * 3. npm install node-fetch@2
 */

const mcts_key = "feyhDTiKz5rHvp3TXtWVQQYTh";  // Replace with your MCTS Key
const route = "GRE";     // Replace with your route

const mongoose = require('mongoose'); // MongoDB API for Node.js
const fetch = require('node-fetch');  // Fetch API for Node.js

console.log("MongoBusDataCollector running.");

let timer = null; // Timer used by set and clear Interval

// connect to the database named "bustracker" on the local mongo server
mongoose.connect('mongodb://localhost/bustracker', {useNewUrlParser: true, useUnifiedTopology: true});

// A schema describes the format/structure of the documents in a collection
const busSchema = new mongoose.Schema({
    'rt': String,
    'vid': String,
    'spd': Number,
    'tmstmp': String,
    'lat': String,
    'lon': String
});

// A model represents a document in a database collection
const BusModel = mongoose.model('Bus', busSchema);

/**
 * jsonFetch - Run an asynchronous GET for a resource and
 *     invoke a callback with the JSON result
 * @param url - the URL for the resource
 * @param onSuccess - callback for success
 * @param onError - callback for error
 */
const jsonFetch = (url, onSuccess, onError) => {
    fetch(url)
        // Get JSON response and status code
        .then(res => res.json().then(json => ({status: res.status, data: json})))
        .then((results) => {
            // Check return status code, send error if necessary
            if (results.status !== 200) {
                onError(results);
            }
            // results status is good, call onDone
            else {
                onSuccess(results.data);
            }
        })
        // Some error occurred, just send response data
        .catch((error) => {
            onError(error);
        });
}

/**
 * fetchSuccess - Callback for successful MCTS fetch
 *    Saves the result to the MongoDB bustracker.buses
 * @param data - the response data (JavaScript Object);
 */
const fetchSuccess = (data) => {
    if(data.status !== undefined) {
        console.log(`Error in response: ${data.status}`);
        clearInterval(timer);
        return;
    }
    if(data['bustime-response'].error !== undefined) {
        data['bustime-response'].error.forEach((error) => {
            console.log(`Error in response: Route:${error.rt} Message:${error.msg}`);
        });
        clearInterval(timer);
        return;
    }

    console.log('Received valid MCTS response, storing data...');

    for(const vehicle of data['bustime-response'].vehicle) {
        if(vehicle.spd > 0) {
            console.log(`Storing data for bus ${vehicle.vid} speed ${vehicle.spd}`);

            // create a new BusModel object
            const bus = new BusModel({
                'rt': vehicle.rt,
                'vid': vehicle.vid,
                'spd': vehicle.spd,
                'tmstmp': vehicle.tmstmp,
                'lat': vehicle.lat,
                'lon': vehicle.lon
            });

            // save the BusModel object to Mongo to a collection named "buses"
            bus.save((error) => {
                if (error !== null) {
                    console.error(error); // log an error if one occurs
                    clearInterval(timer);
                }
            });
        }
    }
};

/**
 * fetchError - Error callback on failed MCTS request
 * @param error - Error object
 */
const fetchError = (error) => {
    console.log(`Error in fetch: ${error}`);
    clearInterval(timer);
}

/**
 * getBusData - Issue an MCTS request to retrieve bus route data
 */
const getBusData = () => {
    const target = `http://realtime.ridemcts.com/bustime/api/v2/getvehicles?key=${mcts_key}&rt=${route}&format=json`;
    jsonFetch(target, fetchSuccess, fetchError);
}

// periodically sample bus data from MCTS
timer = setInterval(getBusData, 15000);
