let replaceDescription;
let replaceImage;

function levelBonusConsole(name, input){
    switch(name){
        case 'Bonus-Puzzle':
            return includeBonusPuzzle(input);
    }

}


function includeBonusPuzzle(input){
    replaceDescription = ""; // empty string mean no need to change the content of description, otherwise, type the content you wish to change here.
    if (hasBonusAns(input)) {
        return new Array(true, replaceDescription,replaceImage);
    }
    return new Array(false, replaceDescription,replaceImage);

}

function hasBonusAns(input){
    return input.toLowerCase().includes("lewis");
}
export default levelBonusConsole;
