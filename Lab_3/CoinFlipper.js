// Class: SE2840 - JavaScript Coin Flipper DOM
// Name: Nigel Nelson
// Class Section: 021
// -----------------------------
// jshint esversion: 6
// jshint devel:true
// jshint unused:false

/**
 * Executes the encapsulated instructions when the HTML window is completely loaded.
 */
window.onload = () => {
    hideErrorLabels();
    hideHistogram();
    hideExecutionTime();
    const submitButton = document.getElementById("submitButton");
    submitButton.onclick = run;
};

/**
 * Hides the HTML elements responsible for alerting the user of errors in the input.
 * @returns null
 */
function hideErrorLabels(){
    const coinsError = document.getElementById("numCoinsError");
    const flipsError = document.getElementById("numFlipsError");
    coinsError.style.visibility = "hidden";
    flipsError.style.visibility = "hidden";
}

/**
 * Hides all rows of the histogram from the user.
 * @returns null
 */
function hideHistogram(){
    const rows = document.getElementsByTagName("tr");
    for (let i = 0; i < 11; i++){
        rows[i].style.visibility = "hidden";
    }
}

/**
 * Collects user input, and depending on the validity of the input will either execute the coin flips,
 * output the histogram and the execution time, or will display warnings for the invalid input.
 * @returns null
 */
function run(){
    const coinsInput = document.getElementById("numCoins");
    const coinsError = document.getElementById("numCoinsError");
    const numCoins = coinsInput.value;
    const coinsIsValid = validateInput(numCoins, 1, 10, coinsError);

    const flipsInput = document.getElementById("numFlips");
    const flipsError = document.getElementById("numFlipsError");
    const numFlips = flipsInput.value;
    const flipsIsValid = validateInput(numFlips, 1, 1000000, flipsError);

    if(coinsIsValid && flipsIsValid){
        const coins = parseInt(numCoins);
        const flips = parseInt(numFlips);
        const startTime = performance.now();
        const frequency = flipCoins(coins, flips);
        const executionTime = performance.now() - startTime;
        hideHistogram();
        displayHistogram(coins, flips, frequency);
        displayExecutionTime(executionTime);
    }else{
        hideHistogram();
        hideExecutionTime();
    }
}

/**
 * Validates that the user entered number is numerical and within specified bounds, otherwise it will display
 * an error message.
 * @param num the user input
 * @param lowerBound inclusive lower end of acceptable values
 * @param upperBound inclusive upper end of acceptable values
 * @param label the HTML element that should be displayed should the input be invalid
 * @returns {boolean} whether the input was valid
 */
function validateInput(num, lowerBound, upperBound, label){
    let isValid = false;
    if(isNaN(num) || !Number.isInteger(parseFloat(num))){
        if(num === ""){
            label.innerHTML = `Input value '' is not valid. No input given.`;
        }else{
            label.innerHTML = `Input value '${num}' is not valid. Input must be an integer.`;
        }
        label.style.visibility = "visible";
    } else {
        const number = parseFloat(num);
        if ((number < lowerBound) || (number > upperBound)){
            label.innerHTML = `Input value '${num}' is not valid. Input must be >= ${lowerBound} and <= ${upperBound}.`;
            label.style.visibility = "visible";
        } else{
            label.style.visibility = "hidden";
            isValid = true;
        }
    }
    return isValid;
}

/**
 * This method flips a specified number of coins a specified number of times
 * and gathers the number of times a certain number of heads occurred in each flip into a frequency[] array.
 * @param numCoins the number of coins to flip
 * @param numFlips the number of times to flip each coin
 * @return array representing the frequency of 'heads' for each flip repetition
 */
function flipCoins(numCoins, numFlips){
    // The frequency array holds the number of times a particular number of heads occurred:
    // frequency[0] holds the number of times 0 heads occurred
    // frequency[1] holds the number of times 1 head occurred
    // ...
    // frequency[numberOfCoins] holds the number of times all heads occurred
    const frequency = new Array(numCoins + 1).fill(0);
    for(let i = 0; i < numFlips; i++) {
        let heads = flipCoinsOneTime(numCoins);
        frequency[heads]++;
    }
    return frequency;
}

/**
 * This method flips a set of coins and returns the number heads that occurred.
 * It makes use of a random number generator to randomly generate heads or tails for each flip.
 * @param numCoins the number of coins to flip
 * @return the number of heads that occurred in the flips
 */
function flipCoinsOneTime(numCoins){
    let heads = 0;
    for(let i = 0; i < numCoins; i++){
        heads += Math.floor(Math.random() * 2);
    }
    return heads;
}

/**
 * Displays the histogram according to the user input and the results of the coin flips
 * @param numCoins number of coins flipped
 * @param numFlips number of times to flip the set of coins
 * @param frequency array with the counts of how many times certain proportions of heads were encountered
 * @returns null
 */
function displayHistogram(numCoins, numFlips, frequency){
    const rows = document.getElementsByTagName("tr");
    const counts = document.getElementsByClassName("count");
    const progresses = document.getElementsByClassName("histogram");
    for(let i = 0; i < frequency.length; i++){
        counts[i].innerHTML = frequency[i];
        progresses[i].value = (frequency[i] / Math.max.apply(0, frequency)) * 100;
        rows[i].style.visibility = "visible";
    }
}

/**
 * Displays the elapsed time required to flip all the coins
 * @param elapsedTime the time required to flip the coins
 * @returns null
 */
function displayExecutionTime(elapsedTime){
    const timeLabel = document.getElementById("executionTime");
    timeLabel.innerHTML = `Elapsed Time: ${elapsedTime} ms`;
    timeLabel.style.visibility = "visible";
}

/**
 * Hides the execution time from the webpage
 * @returns null
 */
function hideExecutionTime(){
    const timeLabel = document.getElementById("executionTime");
    timeLabel.style.visibility = "hidden";
}