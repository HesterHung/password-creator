let replaceDescription;
const winning_city = ["Argentina", "France", "Germany", "Spain", "Italy", "Brazil", "England", "Uruguay",];

import { storeInLocalStorage, getFromLocalStorage, getRandomInt } from "./script.js"

let newDecription = '';
let flagSET = false;
let extraTempDataArr = [];

const commonData = {
    data: [],
    setData: function (dataFetched) {
        this.data = dataFetched;
    },
    get: function () {
        return this.data;
    }
};

function getData(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                reject(new Error(`Response status: ${response.status}`));
            }
            const json = await response.json();
            storeInLocalStorage('dataFetched', json);
            await assignFromlocalStorage(json);
            resolve(commonData.data);
        } catch (error) {
            reject(error);
        }
    });
}

async function assignFromlocalStorage(dataFetched) {
    commonData.setData(dataFetched);
    console.log(commonData.data);
}

function levelTwoConsole(name, input) {
    switch (name) {
        case 'Nobel-Prize':
            return includeNobelPrize(input.toLowerCase())
        case 'Olympic-City':
            return includeOlympicCity(input);
        case 'FIFA-Winning-Country':
            return includeFIFAWinningCountry(input);
        case 'Unit':
            return includeUnit(input)
    }
}




//End







//Requirement Function to Get Result
function includeOlympicCity(input) {
    replaceDescription = ""; // empty string mean no need to change the content of description, otherwise, type the content you wish to change here.
    if (hasOlympicCity(input)) {
        return new Array(true, replaceDescription);
    }
    return new Array(false, replaceDescription);
}
function includeFIFAWinningCountry(input) {
    replaceDescription = ""; // empty string mean no need to change the content of description, otherwise, type the content you wish to change here.
    if (hasCountry(input)) {
        return new Array(true, replaceDescription);
    }
    return new Array(false, replaceDescription);
}

function includeUnit(input) {
    replaceDescription = ""; // empty string mean no need to change the content of description, otherwise, type the content you wish to change here.
    if (hasUnit(input)) {
        return new Array(true, replaceDescription);
    }
    return new Array(false, replaceDescription);
}

async function includeNobelPrize(input) {
    const categoryArr = ['che', 'eco', 'lit', 'phy', 'pea', 'med'];

    let awardYear;
    let awardCategory;
    let lastNameArr = [];
    let rtn_bool = false;
    if (!flagSET) {
        try {
            let randomYear = getRandomInt(1901, new Date().getFullYear());
            let randomCategory = categoryArr[getRandomInt(0, 6)];
            console.log(randomYear, randomCategory) //DEBUG
            const fetchedData = await getData(`http://api.nobelprize.org/2.1/nobelPrizes?nobelPrizeYear=${randomYear}&nobelPrizeCategory=${randomCategory}&format=json`);
            if (fetchedData.nobelPrizes && fetchedData.nobelPrizes.length > 0 && fetchedData.nobelPrizes[0].awardYear) {
                awardYear = commonData.data.nobelPrizes[0].awardYear;
                awardCategory = commonData.data.nobelPrizes[0].category.en;
                lastNameArr = commonData.data.nobelPrizes[0].laureates.map(getlastNameFromEachArr)
                extraTempDataArr = lastNameArr;

                console.log(awardYear);
                console.log(awardCategory);
                console.log(lastNameArr);

            } else {
                console.log("Data not available yet.");
                fetchedData.nobelPrizes.length || await includeNobelPrize(); // Re-fetch data if length = 0
            }
        } catch (error) {
            console.error(error.message);
            fetchedData.nobelPrizes.length || await includeNobelPrize(); // Re-fetch data
        }
        flagSET = true;
    }

    newDecription = `The password must include a last name of any laureate of The Nobel Prize in ${awardCategory} ${awardYear}.`

    for (let n of extraTempDataArr) {
        if (input.includes(n)) {
            rtn_bool = true;
            break;
        }
        console.log(n);
    }

    console.log("last name arr: " + extraTempDataArr);
    console.log("input: " + rtn_bool);
    console.log("new: "+ newDecription);
    let rtn_arr = [rtn_bool, newDecription];
    console.log("new: "+ rtn_arr[1]);

    return new Array();
}


function getlastNameFromEachArr(obj) {
    const fullName = obj.fullName.en.toLowerCase();
    const lastName = fullName.split(' ').pop();
    return lastName.toLowerCase();
}

function getArr(arr) {
    if (typeof arr === 'undefined') {
        arr = [];
        console.log('define!')
    }
    return arr;
}


//End

//Function check
function hasOlympicCity(input) {
    return input.toLowerCase().includes("rio");
}

function hasCountry(input) {
    return input.toLowerCase().includes("argentina")
}

function hasUnit(input) {
    return input.toLowerCase().includes("ohm");
}

//End




export default levelTwoConsole;
