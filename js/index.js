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
    
    try{
     const {data} = await axios.get(APIendpoint);
     console.log(data);

    if(data.error){
        throw new Error("error");
    }    
    gatherData(data.query.pages);

    } catch(error){  
        showError(error);
    }finally{
        enableSearch();
        
    } 
    gatherData();
    
    // console.log(data.events.text);
};

const gatherData = pages => {

    outputContainer.textContent = dayInput.value;
    // const results = Object.values(pages);
    // console.log(results);
    // // console.log(Object.values(pages));

    // const results = (pages).map(page => ({
    //     page_url: page.pageid,
    //     title: page.title,
    //     content: page.extract,
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

// const showResults = results => {

//     results.forEach(result => {
//         outputContainer.innerHTML += `
//         <div class="results__item">
//             <a href="https://en.wikipedia.org/?curid=${result.page_url}" target="_blank" class="card animated bounceInUp">
//                 <h2 class="results__item__title">${result.title}</h2>
//                 <p class="results__item__intro">${result.content}</p>
//             </a>
//         </div>
//     `;
//     });
// };




