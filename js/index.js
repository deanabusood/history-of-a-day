//header content
const headerText = document.querySelector("h1");

//input content
const monthInput = document.querySelector("#months");
const dayInput = document.querySelector("#days");

const months = ["Placeholder", 
                    "January", "February", "March", 
                    "April", "May", "June", 
                    "July", "August", "September", 
                 "October", "November", "December"];
           
(function populateMonths (){
    for(let i = 1; i < months.length; i++){
        const option = document.createElement("option");
        option.value = i;
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
        case "1": case "3": case "5": case "7": 
        case "8":  case "10": case "12":
            numDays = 31;
            break;
        case "4": case "6": 
        case "9": case "11":
            numDays = 30;
            break;
        case "2":
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

//search content
const submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", () =>{
    if(isInputEmpty()) return;
    
    getData();
});

const isInputEmpty = () =>{
    return !dayInput.value || !monthInput.value;
};

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

const getData = async () =>{
    const userInputMonth = "0"+monthInput.value;
    const userInputDay = "0"+dayInput.value;

    disableSearch();
    
    const APIendpoint = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${userInputMonth}/${userInputDay}`;
    const { data } = await axios.get(APIendpoint);

    console.log(data)
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





//API content
// const APIparameters = {
//     action: "query",
//     format: "json",
//     origin: "*",
//     prop: "extracts",
//     exchars: 250,
//     exintro: true,
//     explaintext: true,
//     generator: "search",
//     gsrlimit: 20,
// };
// APIparameters.gsrsearch = userInputMonth+" "+userInputDay;
