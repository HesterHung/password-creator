let replaceDescription;
let replaceImage;

function levelOneConsole(name, input) {
    switch (name) {
        case 'Include-UpperLetter':
            return includeUpperLetter(input);
        case 'Include-LowerLetter':
            return includeLowerLetter(input);
        case 'Include-Number':
            return includeNumber(input);
    }
}




//REQUIREMENT FUNCTION SECTION

function includeUpperLetter(input) {
    replaceDescription = ""; // empty string mean no need to change the content of description, otherwise, type the content you wish to change here.
    if (hasUppercaseLetters(input)) {
        return new Array(true, replaceDescription,replaceImage);
    }
    return new Array(false, replaceDescription,replaceImage);
}

function includeLowerLetter(input) {
    replaceDescription = "";
    if (hasLowercaseLetters(input)) {
        return new Array(true, replaceDescription,replaceImage);
    }
    return new Array(false, replaceDescription,replaceImage);
}

function includeNumber(input) {
    replaceDescription = "";
    if (hasNumber(input)) {
        return new Array(true, replaceDescription,replaceImage);
    }
    return new Array(false, replaceDescription,replaceImage);
}

//END OF REQUIREMENT FUNCTION SECTION







//SUPPORT FUNCTION SECTION

function hasUppercaseLetters(input) {
    return /[A-Z]/.test(input);
}

function hasLowercaseLetters(input) {
    return /[a-z]/.test(input);
}

function hasNumber(input) {
    return /\d/.test(input);
}

//END OF SUPPORT FUNCTION SECTION





export default levelOneConsole;
