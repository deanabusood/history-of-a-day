//header content
const headerText = document.querySelector("h1");

//input content
const monthInput = document.querySelector("#months");
const dayInput = document.querySelector("#days");

const months = ["Placeholder",
                    "January", "February", "March", 
                    "April", "May", "June", 
                    "July", "August", "September", 
                 "October", "November", "December"
                ];
           
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

//ZERO PADDED
function getUserMonth(){
    return monthInput.value < 10 ? "0"+monthInput.value : monthInput.value;
}

function getUserDay(){
     return dayInput.value < 10 ? "0"+dayInput.value : dayInput.value;
}

const getData = async () =>{
    const userInputMonth = getUserMonth();
    const userInputDay = getUserDay();
    const APIendpoint = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${userInputMonth}/${userInputDay}`;

    disableSearch();
    clearOutput();
    
    try{
     const {data} = await axios.get(APIendpoint);

    if(data.error){
        throw new Error("error");
    }    
    gatherData(data);

    } catch(error){  
        showError(error);
    }finally{
        enableSearch();   
    } 
};

const gatherData = (data) => {
    const results = [];
    results.length = 0;
    const duplicateCheck = [];
    
    let eventCount = 0;
    while(eventCount < 5){ //get 5 random results
        let index = Math.floor(Math.random() * data.events.length);
        console.log(index);
        if(!duplicateCheck.includes(index)){
            duplicateCheck.push(index);

        let event = {
            title: data.events[index].pages[0].normalizedtitle,
            text: data.events[index].text,
            url: data.events[index].pages[0].content_urls.desktop.page,
            image: "thumbnail" in data.events[index].pages[0] ? data.events[index].pages[0].thumbnail.source : "./img/time.jpg", //placeholder if no image found
        }
        results.push(event);
        eventCount++;
        }
    }

    console.log(results);



    // const imageTest = document.createElement("img");
    // // imageTest.src = results[0].image;
    // imageTest.src = "./img/time.jpg";
    // outputContainer.appendChild(imageTest);

    // showResults(results);
};

// function containsDuplicate(array, event){
//     return array.some(event => )
// }

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