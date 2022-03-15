const headerText = document.querySelector("h1");

//Search content
const monthInput = document.querySelector("#month");
const dayInput = document.querySelector("#day");
const submitButton = document.querySelector("#submit-button");

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
    if( (!monthInput || monthInput === "") || (!dayInput || dayInput === "")){
        return true;
    }
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

