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
       
        // option.value = months[i].toLowerCase();
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
    console.log(data.events.length);
   

    // const test = [];
    // test.push(data.events[0].pages[0].normalizedtitle);
    // // results.add(data.events[0].pages[0].normalizedtitle);
    // console.log(test);
    
    // //working
    // console.log(data.events[0].pages[0].normalizedtitle); //normalizedtitle
    // console.log(data.events[0].text);
    // console.log(data.events[0].pages[0].content_urls.desktop.page);
    // const image = document.createElement("img");
    // // image.src = data.events[0].pages[0].originalimage.source;
    // image.src = data.events[0].pages[0].thumbnail.source;
    // outputContainer.appendChild(image);

    // console.log(data.events[4].pages[0].normalizedtitle); //normalizedtitle
    // console.log(data.events[4].text);
    // console.log(data.events[4].pages[0].content_urls.desktop.page);
    // const image2 = document.createElement("img");
    // image2.src = data.events[4].pages[0].originalimage.source;
    // outputContainer.appendChild(image2);

    // const results = data.map(result => ({
    //     title: data.events[0].pages[0].normalizedtitle

    // }));

    const results = [];
    let eventCount = 0;
    while(eventCount < 3){ //make only top 3 results
        let index = Math.floor(Math.random() * data.events.length);
        //need to check for duplicate here

        let event = {
            title: data.events[index].pages[0].normalizedtitle,
            text: data.events[index].text,
            url: data.events[index].pages[0].content_urls.desktop.page,
            image: data.events[index].pages[0].originalimage.source,
        }
        results.push(event);
        eventCount++;
    }
    
    console.log(results);
        

    



    // const image = document.createElement("img");
    // image.src = data.events[0].pages[0].originalimage.source;
    // outputContainer.appendChild(image);

    // const image2 = document.createElement("img");
    // image2.src = data.events[0].pages[0].originalimage.source;
    // outputContainer.appendChild(image2);

    // const image4 = document.createElement("img");
    // image4.src = data.events[0].pages[0].originalimage.source;
    // outputContainer.appendChild(image4);
    //

    // const results = (data).map(page => ({
    //         // page_url: page.pageid,
    //         year: page.year,
    //         text: page.text,
    //     }));

    // const results = Object.values(data).map(event => ({
    //     title: data.pages[0].normalizedtitle,
    //     text: data.text,
    //     url: data.pages[0].content_urls.desktop.page,
    //     image: data.pages[0].originalimage.source,
    // }));
    
    // console.table(results);


    

    // const image = document.createElement("img");
    // image.src = results[0].image;
    // outputContainer.appendChild(image);

    // const image3 = document.createElement("img");
    // image3.src = data.events[0].pages[0].originalimage.source;
    // outputContainer.appendChild(image3);

    //array of objects
    // const results = (data).map(page => ({
    //     // page_url: page.pageid,
    //     year: page.year,
    //     text: page.text,
    // }));

    

    // showResults(results);
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

const showResults = results => {

    results.forEach(result => {
        const output = document.createElement("div");



        outputContainer.appendChild();
        ;
    });
};
// <a href="https://en.wikipedia.org/?curid=${result.page_url}" target="_blank" class="card animated bounceInUp">




