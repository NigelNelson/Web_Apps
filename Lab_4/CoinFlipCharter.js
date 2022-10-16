// Class: SE2840 - Coin Flip Charter
// Name: Nigel Nelson
// Class Section: 021

/**
 * chartSetup
 * Set up the Google chart properties and other page events
 */
const chartSetup = () => {
    // Initialize the Google chart package
    google.charts.load('current', {packages: ['corechart', 'bar', 'table']});
    google.charts.setOnLoadCallback(createDefaultDisplay);
    // Set up the button handler to call a function that updates the page
    document.getElementById("update").onclick = updateDisplay;
};

/**
 * createDefaultDisplay
 * Create the "default" page - display all data with no filters
 */
const createDefaultDisplay = () => {
    // Initializing a new DataTable and setting the columns
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Index');
    data.addColumn('string', 'ID');
    data.addColumn('number', 'Coins');
    data.addColumn('number', 'Flips');
    data.addColumn('string', 'Browser');
    data.addColumn('number', 'Time');

    // Adding the data from results to the Datatable
    for (let i = 0; i < results.length; i++) {
        data.addRow([i + 1 + "", results[i].id, results[i].coins,
            results[i].flips, results[i].browser, results[i].time]);
    }

    // Displaying the chart
    drawChart(data);

    // Creating and displaying a Google Table from the DataTable
    const table = new google.visualization.Table(document.getElementById('tableData'));
    table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
};

/**
 * Converts a Google DataView to an array
 * @param chartData a Google DataView
 * @returns {[]} Array with only the index and time values from the chartData
 */
const viewToArray = (chartData) => {
    let arr = [];
    for (let i = 0; i < chartData.getNumberOfRows(); i++) {
        arr.push([chartData.getValue(i, 0) + "", chartData.getValue(i, 5)]);
    }
    return arr;
}

/**
 * drawChart
 * Display the given chartData in the Google chart
 */
const drawChart = (chartData) => {
    // Creating a new DataTable from the passed DataView
    let dataArray = viewToArray(chartData);
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'index');
    data.addColumn('number', 'Coin Flipper Execution Time');
    data.addRows(dataArray);

    // Set the options for the Google chart
    //   The chart must be 1200 pixels wide
    //   The chart must be 400 pixels tall
    //   The legend must be on the 'top'
    //   The chartArea should have a height that is 80% of the chart space
    //   The chartArea should have a width that is 90% of the chart space
    const options = {
        height: 400,
        width: 1200,
        chartArea: {
            height: '80%',
            width: '90%'
        },
        legend: {
            position: "top"
        },
        vAxis: {
            title: "Coin Flipper Execution Time",
            titleTextStyle: {
                fontSize: 16,
                bold: true,
                italic: false
            }
        },
        hAxis: {
            format: ''
        }
    };

    // Drawing a column chart based on "data"
    const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
};

const updateDisplay = () => {

    // Creating a new DataTable from the data stored in "results"
    const data = new google.visualization.DataTable();
    data.addColumn('number', 'Index');
    data.addColumn('string', 'ID');
    data.addColumn('number', 'Coins');
    data.addColumn('number', 'Flips');
    data.addColumn('string', 'Browser');
    data.addColumn('number', 'Time');
    for (let i = 0; i < results.length; i++) {
        data.addRow([i + 1, results[i].id, results[i].coins,
            results[i].flips, results[i].browser, results[i].time]);
    }
    // Constructing a DataView from the DataTable
    const view = new google.visualization.DataView(data);

    // Getting the filter value from the text field
    const filter = document.getElementById('filter').value;

    // Checking to see if the filter is empty
    if (filter !== "") {
        let filteredRows = data;
        // Checking which radio button is selected, and filtering the DataTable accordingly
        if (document.getElementById('id1').checked) {
            filteredRows = data.getFilteredRows([{
                column: 1,
                test: function (value) {
                    return (value.includes(filter))
                }
            }]);
        } else if (document.getElementById('coins1').checked) {
            filteredRows = data.getFilteredRows([{
                column: 2,
                value: parseInt(filter)
            }]);
        } else if (document.getElementById('flips1').checked) {
            filteredRows = data.getFilteredRows([{
                column: 3,
                value: parseInt(filter)
            }]);
        } else if (document.getElementById('browser1').checked) {
            filteredRows = data.getFilteredRows([{
                column: 4,
                test: function (value) {
                    return (value.includes(filter))
                }
            }]);
        }
        view.setRows(filteredRows);
    }

    // Drawing the updated chart and table
    drawChart(view);
    const table = new google.visualization.Table(document.getElementById('tableData'));
    table.draw(view, {showRowNumber: false, width: '100%', height: '100%'});
};

window.onload = () => {
    chartSetup();
};
