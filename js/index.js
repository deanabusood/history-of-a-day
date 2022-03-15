const headerText = document.querySelector("h1");

//Search content
const monthInput = document.querySelector("#months");
const dayInput = document.querySelector("#days");
const submitButton = document.querySelector("#submit-button");

//populate month and day lists
const months = ["January", "February", "March", 
                    "April", "May", "June", 
                    "July", "August", "September", 
                 "October", "November", "December"];



                 
(function populateMonths (){
    for(let i = 0; i < months.length; i++){
        const option = document.createElement("option");
        option.value = months[i].toLowerCase();
        option.textContent = months[i];
        monthInput.appendChild = option;
    }
}) ();

//need custom input
(function populateDays (){
    for(let i = 0; i < months.length; i++){
        const option = document.createElement("option");
        option.value = months[i].toLowerCase();
        option.textContent = months[i];
        monthInput.appendChild = option;
    }
}) ();


//
const disableSearch = () => {
    monthInput.disabled = true;
    dayInput.disabled = true;
    submitButton.disabled = true;
};

const enableSearch = () => {
    monthInput.disabled = false;
    dayInput.disabled = false;
    submitButton.disabled = false;
};

const isInputEmpty = (monthInput, dayInput) =>{
    if(monthInput == "month" || dayInput == "day") return true;
};


//Output content
const outputContainer = document.querySelector("#output");
const error = outputContainer.querySelector("#error");

const clearOutput = () => {
    outputContainer.textContent = "";
    error.textContent = "";
};

const showError = (error) => {
    error.textContent = "An error occurred, please try again."
};

