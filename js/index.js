//header content
const headerText = document.querySelector("h1");

//input content
const monthInput = document.querySelector("#months");
const dayInput = document.querySelector("#days");

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
    const userInputMonth = monthInput.value;
    const userInputDay = "0"+dayInput.value;

    // APIparameters.gsrsearch = userInputMonth+" "+userInputDay;
    disableSearch();
    // const APIendpoint = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${userInputMonth}/${userInputDay}`;
    // const APIendpoint = "https://en.wikipedia.org/w/api.php";
    const APIendpoint = "https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/01/02";
    const { data } = await axios.get(APIendpoint);

    // outputContainer.textContent = "";
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
