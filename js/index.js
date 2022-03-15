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
       
        option.addEventListener("click", () =>{
            populateDays(option.value);
        });

        monthInput.appendChild(option);
    }
}) ();

function populateDays (month){
    while(dayInput.firstChild){
        dayInput.removeChild(dayInput.firstChild);
    }
    let numDays;

    switch(month){
        case "january": case "march": case "may": case "july": 
        case "august":  case "october": case "december":
            numDays = 31;
            break;
        case "april": case "june": 
        case "september": case "november":
            numDays = 30;
            break;
        case "february":
            numDays = 29;
            break;
    }

    for(let i = 1; i <= numDays; i++){
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        dayInput.appendChild(option);
    }
};



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
    if(monthInput == "" || dayInput == "") return true;
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