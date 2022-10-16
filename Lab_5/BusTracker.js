// Class: SE2840 - AJAX Bus Tracker
// Name: Nigel Nelson
// Class Section: 021

const FT_MILE_CONVERSION = 5280;
const mcts_key = "feyhDTiKz5rHvp3TXtWVQQYTh"; // MCTS key

// Icon that will be displayed by the map
const busIcon = L.icon({
    iconUrl: 'busIcon.png',
    iconSize:     [45, 45], // size of the icon
    iconAnchor:   [22.5, 22.5], // point of the icon which will correspond to marker's location
});

/**
 * Class that encapsulates the variables and functions that pertain to the bus tracking
 * functionality.
 */
class BusTracker {
    constructor() {
        this.map = this.initMap();
        this.intervalID = null;
        this.markers = [];
    }

    /**
     * Initializes the leaflet map
     * @return {*} the leaflet map instance
     */
    initMap() {
        const msoe_Location = [43.044241, -87.907485]
        const map = L.map('map').setView(msoe_Location, 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        return map;
    }

    /**
     * Assigns the corresponding event handlers to the buttons included in the Bus Tracker App
     */
    initInputElements() {
        const startButton = document.getElementById("start");
        startButton.onclick = async () => await this.onStart();
        startButton.enabled = true;

        const stopButton = document.getElementById("stop");
        stopButton.onclick = () => this.onStop();
        stopButton.enabled = false;

        const removeMarkers = document.getElementById("removeMarkers");
        removeMarkers.onclick = () => this.removeMarkers();
    }

    /**
     * Event handler for the Stop button being clicked. This function disables the stop button,
     * enables the start button, and stops the loop of bus locations being updated every 5 seconds
     */
    onStop() {
        const stopButton = document.getElementById("stop");
        stopButton.disabled = true;

        const startButton = document.getElementById("start");
        startButton.disabled = false;

        const routeInput = document.getElementById("route");
        routeInput.disabled = false;

        // Stop the map from continuing to update bus locations
        clearTimeout(this.intervalID);
    }

    /**
     * Function invoked when the start button is clicked. This function removes any pre-existing error messages,
     * enables the stop button, disables the start button, and begins a loop that updates the map every 5 seconds
     * based on the route input by the user
     * @return {Promise<void>}
     */
    async onStart() {
        this.removeError();
        const stopButton = document.getElementById("stop");
        stopButton.disabled = false;
        const startButton = document.getElementById("start");
        startButton.disabled = true;
        const routeInput = document.getElementById("route");
        routeInput.disabled = true;

        // Get the user entered route
        const route = routeInput.value;

        // Immediately attempt to update the map with the specified route
        await this.requestRouteUpdate(route);

        // Update the map every 5 seconds
        this.intervalID = setInterval(async (route) => {
            await this.requestRouteUpdate(route)}, 5000, route);
    }

    /**
     * Responsible for adding map markers for the locations of the buses and adding table rows that correspond to the
     * bus information contained in responseJSON
     * @param responseJSON The AJAX response of the MCTS API when queried for the specified routeID
     * @param routeID The user entered route
     */
    updateMap(responseJSON, routeID) {
        const routeName = document.getElementById("routeID");

        // Update the table header to the routeID
        routeName.innerText = "Route " + routeID;
        const table = document.getElementById("table");

        // Clear the table
        table.innerHTML = "";
        responseJSON["bustime-response"].vehicle.forEach((vehicle) => {

            // Insert each busses info into the table
            const row = table.insertRow(-1);
            const busCol = row.insertCell(-1);
            busCol.innerText = vehicle.vid;
            const destCol = row.insertCell(-1);
            destCol.innerText = vehicle.des;
            const latCol = row.insertCell(-1);
            latCol.innerText = vehicle.lat;
            const lonCol = row.insertCell(-1);
            lonCol.innerText = vehicle.lon;
            const speedCol = row.insertCell(-1);
            speedCol.innerText = vehicle.spd;
            const distCol = row.insertCell(-1);
            distCol.innerText = String(vehicle.pdist / FT_MILE_CONVERSION);

            // Add a marker for the bus
            this.addMarker(vehicle.lat, vehicle.lon, vehicle.vid, routeID);
        });
    }

    /**
     * Responsible for adding an individual bus marker to the map
     * @param lat the latitude of the bus
     * @param lon the longitude of the bus
     * @param vid the vehicle ID of the bus
     * @param route the route name of the bus
     */
    addMarker(lat, lon, vid, route) {
        const marker = L.marker([lat, lon], {icon: busIcon}).addTo(this.map);
        marker.bindPopup("Route: " + route);
        marker.bindTooltip(vid, {
            offset: L.point(0, 25),
            direction: 'bottom',
            permanent: true
        }).openTooltip();
        this.markers.push(marker);
    }

    /**
     * Invoked when the Remove Markers button is clicked. This function removes all displayed markers from the map
     */
    removeMarkers(){
        this.markers.forEach((marker) => {
            this.map.removeLayer(marker);
        });
        this.markers = [];
    }

    /**
     * Responsible for invoking the Fetch request to the MSOE proxy for the MCTS API. If successful the map and
     * table will be updated with the MCTS response's information. However, if an error occurs, it is caught and
     * the error is displayed to the user.
     * @param routeID the user specified route
     * @return {Promise<void>}
     */
    async requestRouteUpdate(routeID) {
        const mcts_routes_url = "https://msoe-web-apps.appspot.com/BusInfo?key=" + mcts_key + "&rt=" + routeID;
        try {
            const response = await fetch(mcts_routes_url);

            // Check that the response status is successful
            if (response.status !== 200) {

                // Throw error is resource not found or if request not successful
                if (response.status === 404) {
                    throw new Error(response.status + ": Requested resource not found");
                } else {
                    throw new Error(String(response.status));
                }
            } else {
                const responseJSON = await response.json();

                // Catch internal error in a successful request
                if (responseJSON.status) {
                    throw new Error(String(responseJSON.status));

                // Catch invalid key error
                } else if (responseJSON["bustime-response"].error) {
                    const errorMSG = responseJSON["bustime-response"].error[0].msg
                    throw new Error("Error response for route: " + routeID + ": " + errorMSG);
                }
                this.updateMap(responseJSON, routeID);
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Responsible for removing any error that is currently displayed
     */
    removeError() {
        const errorDisplay = document.getElementById("errorAlert");
        errorDisplay.innerText = "";
        errorDisplay.classList.add("visually-hidden");
    }

    /**
     * Responsible for displaying request errors to the user
     * @param error the error resulting of a request to the MSOE proxy for the MCTS api
     */
    handleError(error) {
        const errorDisplay = document.getElementById("errorAlert");
        errorDisplay.innerText = "Error: " + error.message;
        errorDisplay.classList.remove("visually-hidden");

        // Correct enabled states of the buttons and end the loop of requests for bus information
        this.onStop();
    }
}

/**
 * Window load event handler
 *    Create a new BusTracker
 */
window.onload = async () => {
    const busTracker = new BusTracker();
    busTracker.initInputElements();
};
