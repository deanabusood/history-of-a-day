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
        monthInput.appendChild(option);
    }
}) ();

function populateDays (){
    let month = monthInput.value;

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

//API fetch
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

function containsDuplicate(array, index){
    return array.includes(index);
}

// stores data in unique object array
const gatherData = (data) => {
    const results = [];
    const duplicateCheck = [];
    
    let eventCount = 0;
    while(eventCount < 4){ //get 4 random events
        let index = Math.floor(Math.random() * data.events.length);

        if(!containsDuplicate(duplicateCheck, index)){ //checks for duplicate
            duplicateCheck.push(index);

        let event = {
            title: data.events[index].pages[0].normalizedtitle,
            year: data.events[index].year,
            text: data.events[index].text,
            url: data.events[index].pages[0].content_urls.desktop.page,
            image: "thumbnail" in data.events[index].pages[0] ? data.events[index].pages[0].thumbnail.source : "./img/no-image-found.png", //placeholder if no image found
        }
        results.push(event);
        eventCount++;
        }
    }

    showResults(results);
};

const showResults = (results =>{
    for(let i = 0; i < results.length; i++){
        let container = document.createElement("div");
        container.classList.add("event-container");

        let imageDiv = document.createElement("div");
        imageDiv.classList.add("event-image-container");

        let link = document.createElement("a");
        link.href = results[i].url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        let image = document.createElement("img");
        image.src = results[i].image;
        image.classList.add("event-image");
        
        link.appendChild(image);
        imageDiv.appendChild(link);
        container.appendChild(imageDiv);
        //upper half ^ (image + link)
        //lower half v (title, year, text)
        let title = document.createElement("h3");
        title.classList.add("event-title");
        title.innerText = results[i].title;
        if(!title.innerText.includes(results[i].year)){
            title.innerText += " ("+results[i].year+")"; //append year only if not already present
        }

        container.appendChild(title);

        let text = document.createElement("p");
        text.classList.add("event-text");
        text.innerText = results[i].text;
        container.appendChild(text);

        outputContainer.appendChild(container);
    }

});

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