import { storeInLocalStorage, getFromLocalStorage, getRandomInt } from "./script.js"

let dataFetched;

//localStorage.clear('dataFetched');

//TEST AREA
includeNobelPrize();
//END OF TEST AREA


//FETCH DATA USING API
async function getData(url) { //return Ojb
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        storeInLocalStorage('dataFetched', await json);
        //console.log(json.nobelPrizes[0].category.en);
    } catch (error) {
        console.error(error.message);
    }

}

function getDataFromLocal(){
    dataFetched = getFromLocalStorage('dataFetched') || [];
}


//console.log(dataFetched);
//END OF FETCH DATA USING API


function levelTwoConsole(name, input) {
    switch (name) {
        case 'includeNobelPrize':
            return includeNobelPrize();
    }
}

function includeNobelPrize() {
    const categoryArr = ['che', 'eco', 'lit', 'phy', 'pea', 'med'];
    let randomYear = getRandomInt(1901, new Date().getFullYear());
    let randomCategory  = categoryArr[getRandomInt(0, 6)];
    console.log(randomYear, randomCategory)
    getData(`http://api.nobelprize.org/2.1/nobelPrizes?nobelPrizeYear=${randomYear}&nobelPrizeCategory=${randomCategory}&format=json`);
    getDataFromLocal();
    console.log(dataFetched);
}




//COMMON FUCNTION





export default levelTwoConsole;
