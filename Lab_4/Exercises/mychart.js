// Class: SE2840 - Exercise: Google Charts
// Name: Nigel Nelson
// Class Section: 021
// -----------------------------
// jshint esversion: 6
// jshint devel:true
// jshint unused:false

/**
 * Function that draws the column chart from the instruction set.
 */
const drawColumnChart = () => {
    const data = new google.visualization.DataTable();
    data.addColumn('number', 'Year');
    data.addColumn('number', '# of Wolves');
    data.addColumn('number', '# of Moose');
    data.addRow([2010, 16, 510]);
    data.addRow([2011, 16, 515]);
    data.addRow([2012, 9, 750]);
    data.addRow([2013, 8, 975]);
    data.addRow([2014, 9, 1050]);
    data.addRow([2015, 3, 1250]);
    data.addRow([2016, 2, 1300]);
    data.addRow([2017, 2, 1600]);
    data.addRow([2018, 2, 1500]);
    data.addRow([2019, 14, 2060]);

    const options = {
        width: 1200,
        height: 400,
        legend: 'top',
        title: 'Wolves and Moose on Isle Royale',
        chartArea: { width: '90%', height: '80%'},
        vAxis: {
            scaleType: 'log',
        },
        hAxis: {
            format: '',
        },
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
};

/**
 * Function that draws a pie chart that represents how my time is divided up in a week.
 */
const drawPieChart = () => {
    const data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Week'],
        ['Eating',     21],
        ['Class',   17],
        ['Sleeping', 55],
        ['Studying',  42],
        ['Commuting', 2],
        ['Audio Books/Podcasts', 7],
        ['Web Surfing', 2],
        ['Hockey', 20],
        ['Working out', 5],
        ['Time with Friends', 10],
    ]);

    const options = {
        title: 'My Weekly Activities By Hour',
        height: 600,
        is3D: true,
        pieStartAngle: 20,
        slices: {  4: {offset: 0.2}},
        sliceVisibilityThreshold: 1/22
    };

    const chart = new google.visualization.PieChart(document.getElementById('pie_chart_div'));

    chart.draw(data, options);
};

/**
 * Function that is used to call both of the draw chart helper methods
 */
const drawCharts = () => {
    drawColumnChart();
    drawPieChart();
}

/**
 * Ensures that once the window is loaded, the chart package is loaded and the charts
 * are drawn.
 */
window.onload = () => {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(drawCharts);
};