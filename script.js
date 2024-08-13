import levelOneConsole from "./level-one-script.js";
import levelTwoConsole from "./level-two-script.js";
import levelThreeConsole from "./level-three-script.js";
import levelBonusConsole from "./level-bonus-script.js";


const passwordInput = document.getElementById('password-input');
const requirementDisplay = document.getElementById('requirement-display');
const progressBar = document.querySelector('.progress');
const progressCount = document.querySelector('#progress-count');

let progressCountValue = 0;

// LOADING REQUIREMENTS FROM JSON FILES SECTION


let requirementsPoolLvOne = [];
let requirementsPoolLvTwo = [];
let requirementsPoolLvThree = [];
let requirementsPoolLvBonus = [];

export function fetchAndStoreData(url, key, pool) {
    if (pool.length === 0) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                pool.push(...data); // Update the pool array
                storeInLocalStorage(key, data);
            })
            .catch(error => console.error('Error loading requirements:', error));
    }
}

fetchAndStoreData('./RequirementsPool/level-one.json', 'requirementsPoolLvOne', requirementsPoolLvOne);
fetchAndStoreData('./RequirementsPool/level-two.json', 'requirementsPoolLvTwo', requirementsPoolLvTwo);
fetchAndStoreData('./RequirementsPool/level-three.json', 'requirementsPoolLvThree', requirementsPoolLvThree);
fetchAndStoreData('./RequirementsPool/level-bonus.json', 'requirementsPoolLvBonus', requirementsPoolLvBonus);

requirementsPoolLvOne = getFromLocalStorage('requirementsPoolLvOne') || [];
requirementsPoolLvTwo = getFromLocalStorage('requirementsPoolLvTwo') || [];
requirementsPoolLvThree = getFromLocalStorage('requirementsPoolLvThree') || [];
requirementsPoolLvBonus = getFromLocalStorage('requirementsPoolLvBonus') || [];

let chosenRequirement = [];
let pool;
let progressArr = Array.apply(false, Array(10)).map(function () { }); //create an empty boolean array
let replaceDescription = "";


export function storeInLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// END OF LOADING REQUIREMENTS FROM JSON FILES SECTION


//COMMON FUNCTION

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function distrubutePool(lv) {
    try {
        switch (lv) {
            case 1:
                return requirementsPoolLvOne;
            case 2:
                return requirementsPoolLvTwo;
            case 3:
                return requirementsPoolLvThree;
            case 4:
                return requirementsPoolLvBonus;
        }

        throw "out of lv"
    } catch (err) {
        console.log("Error: " + err);
    }
}

function updateProgressBar() {
    progressCountValue = progressArr.filter(Boolean).length;
    console.log("progress: " + progressCountValue);
    progressBar.style.width = `${progressCountValue * 10}%`;
    progressCount.textContent = progressCountValue;

}

//END OF COMMON FUNCTION SECTION



//INITIALIZE SECTION

function generateShuffledArray(min, max) {
    // Create an array with numbers from min to max
    const numbers = Array.from({ length: max - min }, (_, i) => i + min);

    // Shuffle the array using Fisher-Yates algorithm
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers;
}

const initializeChosenRequirementArr = () => {
    for (let i = 0; i < 3; i++) {
        pool = distrubutePool(i + 1);
        const ranNumsArr = generateShuffledArray(0, pool.length);
        console.log(ranNumsArr);
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j; //0, 1, 2, ..., 8
            chosenRequirement[index] = pool[ranNumsArr[j]];
            console.log(chosenRequirement[index]);
        }
    }
    pool = distrubutePool(4);
    chosenRequirement[9] = pool[getRandomInt(0, pool.length)];
    console.log(chosenRequirement[9]);
}

initializeChosenRequirementArr();
displayRequirement('');
progressCount.textContent = 0;

//END OF INITIALIZE SECTION

passwordInput.addEventListener('input', () => {
    const userInput = passwordInput.value;
    displayRequirement(userInput);
    MeetsRequirementConsole(userInput);
    updateProgressBar();
});

function getRequirement() {
    for (let i = 0; i < 10; i++) {
        if (!progressArr[i]) {
            return chosenRequirement[i];
        }
    }
}

function displayRequirement(input) {
    if (progressCountValue < 10) {
        requirementDisplay.textContent = replaceDescription || getRequirement().description; //empty string => false
    }
    if (progressCountValue >= 10) {
        requirementDisplay.textContent = 'Congratulations! You have completed all requirements.';
    }
}

function MeetsRequirementConsole(input) {
    for (let i = 0; i < 10; i++) {
        console.log("i:" + i);
        let checkRequirementArr; //2-size array: First: boolean ; Second: new Description
        let currentRequirement = chosenRequirement[i];
        console.log("Requirement:" + currentRequirement.name);
        if (i == 0 || i == 1 || i == 2) {
            checkRequirementArr = levelOneConsole(currentRequirement.name, input);
            try {

                if (!(checkRequirementArr[0])) {
                    replaceDescription = checkRequirementArr[1];
                    progressArr[i] = false;
                    continue;
                }
                progressArr[i] = true;
            } catch (err) {
                console.log("Error: (Lv1) Undefined Requirement.\n" + err);
            }

        } else if (i == 3 || i == 4 || i == 5) {
            checkRequirementArr = levelTwoConsole(currentRequirement.name, input);
            try {
                if (!(checkRequirementArr[0])) {
                    replaceDescription = checkRequirementArr[1];
                    progressArr[i] = false;
                    continue;
                }
                progressArr[i] = true;
            } catch (err) {
                console.log("Error: (Lv2) Undefined Requirement.\n" + err);
            }

        }
        if (i == 6 || i == 7 || i == 8) {
            checkRequirementArr = levelThreeConsole(currentRequirement.name, input);
            try {
                if (!(checkRequirementArr[0])) {
                    replaceDescription = checkRequirementArr[1];
                    progressArr[i] = false;
                    continue;
                }
                progressArr[i] = true;
            } catch (err) {
                console.log("Error: (Lv3) Undefined Requirement.\n" + err);
            }
        }
        if (i == 9) {
            currentRequirement = chosenRequirement[9];
            checkRequirementArr = levelBonusConsole(currentRequirement.name, input);
            try {
                if (!(checkRequirementArr[0])) {
                    replaceDescription = checkRequirementArr[1];
                    progressArr[i] = false;
                    continue;
                }
                progressArr[i] = true;
            } catch (err) {
                console.log("Error: (LvBonus) Undefined Requirement.\n" + err);
            }
        }
    }
}



