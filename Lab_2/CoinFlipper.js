// Class: SE2840 - JavaScript Coin Flipper
// Name: Nigel Nelson
// Class Section: 021

/******************************************************************************************************************
 * CoinFlipper.java
 * Adapted from Dean & Dean - Introduction to Programming with Java: A Problem Solving Approach, ch 9.
 *
 * This program generates a histogram of coin flips. Suppose you have 5 coins and flip them 100000 times.
 * Some flips will result in all heads, some with all tails, and others with some combination of heads and tails.
 * The histogram displays the number of times each combination occurred over all flips.
 ******************************************************************************************************************/

/**
 * run - Coin flipper entry point which controls execution,
 * and measures how long it takes to execute.
 */
const run = () => {
    console.clear();
    const numberCoins = prompt("Enter the number of coins to be flipped: ");
    if (validateInput(numberCoins, 1, 10)){
        const numberFlips = prompt("Enter the number of flips: ");
        if (validateInput(numberFlips, 1, 1000000)){
            const numCoins = parseInt(numberCoins);
            const numFlips = parseInt(numberFlips);
            const startTime = performance.now();
            const frequency = flipCoins(numCoins, numFlips);
            const executionTime = performance.now() - startTime;
            printHistogram(numCoins, numFlips, frequency);
            console.log("Coin Flipper Time: " + executionTime + "ms");
        }
    }
}

/**
 * This method flips a specified number of coins a specified number of times
 * and gathers the number of times a certain number of heads occurred in each flip into a frequency[] array.
 * @param numCoins the number of coins to flip
 * @param numFlips the number of times to flip each coin
 * @return array representing the frequency of 'heads' for each flip repetition
 */
const flipCoins = (numCoins, numFlips) => {
    // The frequency array holds the number of times a particular number of heads occurred:
    // frequency[0] holds the number of times 0 heads occurred
    // frequency[1] holds the number of times 1 head occurred
    // ...
    // frequency[numberOfCoins] holds the number of times all heads occurred
    const frequency = new Array(numCoins + 1).fill(0)
    for(let i = 0; i < numFlips; i++) {
        let heads = flipCoinsOneTime(numCoins)
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
const flipCoinsOneTime = (numCoins) => {
    let heads = 0;
    for(let i = 0; i < numCoins; i++){
        heads += Math.floor(Math.random() * 2);
    }
    return heads;
}

/**
 * This method prints a histogram of the number of heads that occurred for a specified number of flip repetitions
 * Notes: The output generated for coins=5 and times=100000 may look something like this:
 *
 * Number of times each head count occurred in 100000 flips of 5 coins:
 * 0  3076  ***
 * 1  15792  ****************
 * 2  31348  *******************************
 * 3  31197  *******************************
 * 4  15552  ****************
 * 5  3035  ***
 *
 * @param numCoins the number of coins flipped in each repetition
 * @param numFlips the number of times the coins were flipped
 * @param frequency the frequency (count) of heads for each flip repetition
 */
const printHistogram = (numCoins, numFlips, frequency) => {
    console.log("Number of times each head count occurred in " + numFlips + " flips of " + numCoins + " coins:")
    for(let heads = 0; heads < frequency.length; heads++){
        const fractionOfReps = frequency[heads] / numFlips;
        const numOfAsterisks = Math.round(fractionOfReps * 100);
        let outPut = " " + heads + "  " + frequency[heads] + "  ";
        for(let i = 0; i < numOfAsterisks; i++) {
            outPut += "*";
        }
        console.log(outPut)
    }
}

/**
 * Determines if the supplied input is valid
 * @param num the user entered number
 * @param lowerBound inclusive lower bound of acceptable values
 * @param upperBound inclusive upper bound of acceptable values
 * @returns {boolean} indicating if num is valid
 */
const validateInput = (num, lowerBound, upperBound) => {
    let isDigit = false;
    if(isNaN(num) || !Number.isInteger(parseFloat(num))){
        alert("Invalid Input: input must be an Integer between " + lowerBound + " and " + upperBound);
    } else {
        const number = parseFloat(num)
        if ((number < lowerBound) || (number > upperBound)){
            alert("Invalid Input: input must be an Integer between " + lowerBound + " and " + upperBound);
        } else{
            isDigit = true;
        }
    }
    return isDigit;
}

// Run the coin flipper code when the browser finishes loading the js file
run();