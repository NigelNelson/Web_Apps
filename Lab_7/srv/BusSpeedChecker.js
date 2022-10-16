// Class: SE2840 - Bus Speed Tracker
// Name: Nigel Nelson
// Class Section: 021

/**
 * Class that encapsulates the variables and functions that pertain to the bus speed checking
 * functionality.
 */
class BusSpeedChecker {
    constructor() {
        this.map = this.initMap();
        this.markerLayer = L.layerGroup().addTo(this.map);
    }

    /**
     * Initializes the leaflet map
     * @return {*} the leaflet map instance
     */
    initMap() {
        const downtown_Milwaukee =  [43.044240, -87.906446]
        const map = L.map('map').setView(downtown_Milwaukee, 11);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        return map;
    }

    /**
     * Assigns the corresponding event handlers to the input elements included in the Bus Speed Checker App
     */
    initInputElements() {
        const displayBtn = document.getElementById("displayButton");
        displayBtn.onclick = () => this.onDisplay();
    }

    /**
     * Method invoked when the "Display" button is clicked. Responsible for getting the speed entered
     * and passing this speed along with the "BusSpeed" end point path to makeServerRequest
     */
    onDisplay() {
        const speed = document.getElementById("speed").value;
        let path = "BusSpeed";
        this.makeSeverRequest(path, speed);
    }

    /**
     * Responsible for requesting information from the server that reflects the user's input speed value
     * @param path The URL path corresponding to desired server end point
     * @param speed The contents of speed input field
     */
    makeSeverRequest(path, speed) {

        // Define the query for the fetch
        const query = "spd=" + speed;

        $.ajax({
            type: "GET", // Specify to use a GET request
            url: `http://localhost:3000/${path}`, // The resource being requested
            data: query, // The speed entered by the user
            async: true,        // Make the request async
            dataType: "json",   // Get results via JSON
            success: (response, textStatus, jqXHR) => {this.readResponse(response, textStatus, jqXHR)},
            error: (response, textStatus, jqXHR) => {this.handleError(response, textStatus, jqXHR)},
        });
    }

    /**
     * Method invoked when the request was successful. Responsible for parsing the response JSON, and either displaying
     * the data that was returned, or displaying an error if the response indicates that there was an error in the
     * request
     * @param response the data returned by the request
     * @param textStatus string status of the response
     * @param jqXHR XMLHttpRequest object
     */
    readResponse(response, textStatus, jqXHR) {

        // Clear data from previous queries
        const table = document.getElementById("table");
        table.innerHTML = "";
        this.markerLayer.clearLayers();
        this.clearAlerts();

        // If the status is error, pass the params to the handleError() method
        if (response.status === "error"){
            this.handleError(response, textStatus, jqXHR);
            return;
        }

        const markers = []

        response.result.forEach((busEntry) => {

            // Get the attributes associated with the returned busEntry JSON object
            const vid = busEntry.vid;
            const spd = busEntry.spd;
            const lat = busEntry.lat;
            const lon = busEntry.lon;
            const rt = busEntry.rt;

            // Insert the Bus info into the HTML table
            const row = table.insertRow(-1);
            const vidCol = row.insertCell(-1);
            vidCol.innerText = vid;
            const latCol = row.insertCell(-1);
            latCol.innerText = lat;
            const lonCol = row.insertCell(-1);
            lonCol.innerText = lon;
            const spdCol = row.insertCell(-1);
            spdCol.innerText = spd;
            markers.push(this.addMarker(lat, lon, vid, spd, rt));

            // Pan to the Bus location on the map when the row is clicked
            row.onclick = (() => {
                this.map.panTo([lat, lon])
            });
        });

        if(response.result.length > 0){
            // Zoom the map accordingly so all returned markers can be seen
            const markerGroup = new L.featureGroup(markers);
            this.map.fitBounds(markerGroup.getBounds());
        }

        this.displayInfo(response.speed, response.result.length)
    }

    /**
     * Method responsible for displaying how many buses were traveling greater than or equal to
     * the speed entered by the user
     * @param speed the speed entered by the user
     * @param numBuses the number of buses traveling greater than or equal to speed
     */
    displayInfo(speed, numBuses){
        const errorAlert = document.getElementById("infoAlert");
        errorAlert.innerText = `Speeding buses >= ${speed} mph: ${numBuses}`;
        errorAlert.classList.remove("visually-hidden");
    }

    /**
     * Adds a marker on the map for a Bus with the vid and speed displayed. In addition, it ensures
     * that the route is displayed when the marker is clicked.
     * @param lat the latitude of the Bus
     * @param lon the longitude of the Bus
     * @param vid the vid of the Bus
     * @param spd the speed of the Bus
     * @param rt the route of the Bus
     * @return the created marker
     */
    addMarker(lat, lon, vid, spd, rt) {
        const marker = L.marker([lat, lon]).addTo(this.markerLayer);
        marker.bindPopup(rt);
        marker.bindTooltip(vid + ":" + spd, {
            offset: L.point(-15, 25),
            direction: 'bottom',
            permanent: true
        }).openTooltip();
        return marker
    }

    /**
     * Responsible for removing any error or info displayed below the map
     */
    clearAlerts() {
        const errorAlert = document.getElementById("errorAlert");
        errorAlert.innerText = "";
        errorAlert.classList.add("visually-hidden");
        const infoAlert = document.getElementById("infoAlert");
        infoAlert.innerText = "";
        infoAlert.classList.add("visually-hidden");
    }

    /**
     * Responsible for handling errors that resulted from faulty requests
     * @param response the data returned by the request
     * @param textStatus string status of the response
     * @param jqXHR XMLHttpRequest object
     */
    handleError(response, textStatus, jqXHR) {
        // Clear the table and the the map of markers
        const table = document.getElementById("table");
        table.innerHTML = "";
        this.markerLayer.clearLayers();

        const errorDisplay = document.getElementById("errorAlert");
        errorDisplay.innerText = "Error: " + response.message;
        errorDisplay.classList.remove("visually-hidden");
    }
}

/**
 * Upon loading the window, a new BusSpeedChecker is created and the input elements are initialized.
 */
window.onload = () => {
    const busSpeedChecker = new BusSpeedChecker();
    busSpeedChecker.initInputElements()
}
