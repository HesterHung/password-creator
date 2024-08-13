import { storeInLocalStorage, getFromLocalStorage, getRandomInt } from "./script.js"

let newDecription = '';
let flagSET = false;

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

async function levelTwoConsole(name, input) {
    switch (name) {
        case 'Nobel-Prize':
            return await includeNobelPrize(input);
    }
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

    console.log("input: " + input.toLowerCase());
    if (lastNameArr.includes(input.toLowerCase())) {
        rtn_bool = true;
        console.log("input: " + input.toLowerCase());
    }
    return new Array(rtn_bool, newDecription);
}
function getlastNameFromEachArr(obj) {
    const fullName = obj.fullName.en.toLowerCase();
    const lastName = fullName.split(' ').pop();
    return lastName.toLowerCase();
}


levelTwoConsole('includeNobelPrize');
export default levelTwoConsole;
