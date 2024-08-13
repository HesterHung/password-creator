let replaceDescription;
const winning_city=["Argentina", "France", "Germany", "Spain", "Italy","Brazil", "England", "Uruguay",];

function levelTwoConsole(name, input){
    switch(name){
        case 'Olympic-City':
            return includeOlympicCity(input);
        case 'FIFA-Winning-Country':
            return includeFIFAWinningCountry(input);
        case 'Unit':
            return includeUnit(input)
    }
}



//Requirement Function to Get Result
function includeOlympicCity(input) {
    replaceDescription = ""; // empty string mean no need to change the content of description, otherwise, type the content you wish to change here.
    if (hasOlympicCity(input)) {
        return new Array(true, replaceDescription);
    }
    return new Array(false, replaceDescription);
}

function includeFIFAWinningCountry(input){
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


//End

//Function check
function hasOlympicCity(input){
    return input.toLowerCase().includes("rio");
}

function hasCountry(input){
    return input.toLowerCase().includes("argentina")
}

function hasUnit(input){
    return input.toLowerCase().includes("ohm");
}

//End



export default levelTwoConsole;
