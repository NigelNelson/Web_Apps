// Class: SE2840 - Midterm Part 2
// Name: Nigel Nelson
// Class Section: 021
//
// Resource used:
// https://stackoverflow.com/questions/3231459/create-unique-id-with-javascript
// Description: Used inspiration from StackOverflow answers to use Data.now()
// as the unique identifier for grade entries.

/**
 * Function invoked when a user clicks "Add Grade". This function
 * first checks the validity of the input, then if the input is valid,
 * adds the grade entry to the HTML table and saves the entry in local
 * storage.
 */
function addGradeHandler(){
    const assignmentName = document.getElementById("assignment").value;
    const isValidAssignment = validateAssigment(assignmentName);

    // If the assignment name is invalid, exit the function
    if(!isValidAssignment){
        return;
    } else {
        // If no error in input yet, remove any possible errors
        removeError();
    }
    const grade = document.getElementById("grade").value;
    const numGrade = parseInt(grade, 10);
    const isValidGrade = validateGrade(numGrade);

    // If the grade is invalid, exit the function
    if(!isValidGrade){
        return;
    }

    const letterGrade = getLetterGrade(numGrade);

    // Milliseconds from 1970 to now is used as unique ID
    const timeID = Date.now().toString(10);
    // Add Grade entry to the HTML table
    addGradeEntry(assignmentName, letterGrade, timeID);
    // Add Grade entry to local storage
    storeGradeEntry(assignmentName, letterGrade, timeID);
}

/**
 * Responsible for removing any existing error messages.
 */
function removeError(){
    const errorP = document.getElementById("errormessage");
    errorP.textContent = "";
}

/**
 * Responsible for ensuring that the entered grade is greater than
 * or equal to 0, and less than or equal to 100. If these requirements
 * are not met an error message is displayed below the grade table
 * @param grade expected numerical grade value.
 * @return {boolean} whether the grade is in range [0,100]
 */
function validateGrade(grade){
    if(0 > grade || 100 < grade || isNaN(grade)){
        const errorP = document.getElementById("errormessage");
        errorP.textContent = "Invalid Grade! Grade must be in range [0,100]";
        return false;
    }
    return true;
}

/**
 * Responsible for ensuring that the entered assignment is a non-empty
 * string. Otherwise, an error message is shown to the user.
 * @param assignmentName the value from the assignment text field
 * @return {boolean} whether assignment name is a non-empty string
 */
function validateAssigment(assignmentName){
    if(!assignmentName){
        const errorP = document.getElementById("errormessage");
        errorP.textContent = "Assignment name cannot be empty!";
        return false;
    }
    return true;
}

/**
 * Responsible for adding a grade entry row to the Grade Recorder table. This
 * includes the assignment name, the letterGrade, and a remove button that
 * will remove the row upon being clicked.
 * @param assignment the name of the assignment
 * @param letterGrade the letter grade for the assignment
 * @param timeID the time in milliseconds since 1970 that the grade was attempted
 * to be added to the table.
 */
function addGradeEntry(assignment, letterGrade, timeID){
    const table = document.getElementById("grades");

    // Insert a row at the end of the table
    const row = table.insertRow(-1);

    // Add assignment name cell. Inner text used to prevent injection
    const assignmentCol = row.insertCell(-1);
    assignmentCol.innerText = assignment;

    // Add letter grade cell. Inner text used to prevent injection
    const gradeCol = row.insertCell(-1);
    gradeCol.innerText = letterGrade;

    // Add a cell that contains a button that when pressed, removes the
    // entire row from the table as well as from local memory.
    const removeCol = row.insertCell(-1);
    removeCol.innerHTML = "<button onclick='onRemove(this, " + timeID + ")'" +
        " class='btn btn-danger' id='"+ timeID + "'>Remove</button>";
}

/**
 * Click handler for the remove button of a row in the Grade Recorder table.
 * When clicked, the row is removed from the table and the corresponding
 * entry in local storage is removed.
 * @param self The button cell instance
 * @param timeID the time in milliseconds since 1970 the grade entry was originally
 * added to the table
 */
function onRemove(self, timeID){
    // Remove any error messages displayed.
    removeError();
    // Call parentNode until at the level of the entire row, then have the row remove
    // itself.
    self.parentNode.parentNode.remove();
    // Remove the corresponding timeID entry from local storage
    removeGradeEntry(timeID);
}

/**
 * Responsible for storing a grade entry in local storage
 * @param assignment the name of the assignment
 * @param letterGrade the letter grade for the assignment
 * @param timeID the time in milliseconds since 1970 that the grade was attempted
 * to be added to the table.
 */
function storeGradeEntry(assignment, letterGrade, timeID){
    const localStorage = window.localStorage;
    if(localStorage) {
        // convert the grade entry to a JSON object
        const gradeEntry = {'assignment': assignment, 'letterGrade': letterGrade};
        localStorage.setItem(timeID, JSON.stringify(gradeEntry));
    }
}

/**
 * Responsible for removing the corresponding grade entry from
 * local storage.
 * @param timeID the time in milliseconds since 1970 that the grade was attempted
 * to be added to the table.
 */
function removeGradeEntry(timeID){
    const localStorage = window.localStorage;
    if(localStorage) {
        localStorage.removeItem(timeID);
    }
}

/**
 * Responsible for loading all the grade entries in local storage
 * and adding them in order to the Grade Recorder table.
 */
function loadPreviousTable(){
    if(localStorage) {
        for (let i = 0; i < localStorage.length; i++){
            // Convert the string back to a JSON object
            const gradeEntry = JSON.parse(localStorage.getItem(localStorage.key(i)));
            addGradeEntry(gradeEntry.assignment, gradeEntry.letterGrade, localStorage.key(i));
        }
    }
}

/**
 * Responsible for finding grade entries that have duplicate assignment
 * names, and removing the corresponding rows of that grade entry.
 */
function removeDuplicates(){
    // Remove any error messages displayed.
    removeError();
    const table = document.getElementById("grades");
    const rows = table.rows;
    const assignmentsSet = new Set();
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        // Get the assignment name cell of the row
        const assignmentNode = row.cells[0];

        // Check if the assignment name already appeared in the table
        if (assignmentsSet.has(assignmentNode.textContent)){
            // Get the table element
            const parent = row.parentNode;
            // Get the timeID stored in the button's id property
            const timeID = row.childNodes[2].firstChild.id;
            parent.removeChild((row));
            removeGradeEntry(timeID);

            // Decrement i to account for the face rows.length decreased
            // by 1 as a consequence of removing the current row
            i--;
        } else{
            assignmentsSet.add(assignmentNode.textContent);
        }
    }
}

/**
 * Convert the numerical grade to a letter grade according to MSOE's
 * grading scale.
 * @param numGrade the numerical grade out of 100
 * @return {string} the corresponding letter grade for numGrade
 */
function getLetterGrade(numGrade){
    const intGrade = parseInt(numGrade, 10);
    if (intGrade >= 93){
        return "A";
    }
    else if (intGrade <= 92 && intGrade >= 89){
        return "AB";
    }
    else if (intGrade <= 88 && intGrade >= 85){
        return "B";
    }
    else if (intGrade <= 84 && intGrade >= 81){
        return "BC";
    }
    else if (intGrade <= 80 && intGrade >= 77){
        return "C";
    }
    else if (intGrade <= 76 && intGrade >= 74){
        return "CD";
    }
    else if (intGrade <= 73 && intGrade >= 70){
        return "D";
    } else {
        return "F";
    }
}

/**
 * Sets the add Grade and remove duplicate action handlers, as well
 * as populates the Grade Recorder table with any grade entries saved
 * in local storage.
 */
window.onload = () => {
    const addGradeButton = document.getElementById("add");
    addGradeButton.onclick = addGradeHandler;
    const removeDupsButton = document.getElementById("removedup");
    removeDupsButton.onclick = removeDuplicates;
    loadPreviousTable();
}
