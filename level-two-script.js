import { getFromLocalStorage } from "./script.js"

let dataArrOne = [];
let dataArrTwo = [];
let dataArrThree = [];

//TEST AREA
includeNobelPrize();
//END OF TEST AREA


function fetchFromURL(url) {
    fetch(url)
        .then((response) => response.json())
        .then((json) => { console.log(json.text); return json; });
}
// API endpoint URL

async function getData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();

      console.log(json.nobelPrizes[0].category.en);
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }

dataArrOne = getFromLocalStorage('dataArrOne') || [];

console.log(dataArrOne);

function levelTwoConsole(name, input) {
    switch (name) {
        case 'includeNobelPrize':
            return includeNobelPrize();
    }
}

function includeNobelPrize(){

    console.log(getData("https://api.nobelprize.org/2.1/nobelPrizes?limit=1&format=json"));
}


//COMMON FUCNTION

function setURL(newURL){
    url = newURL;
}

export default levelTwoConsole;
