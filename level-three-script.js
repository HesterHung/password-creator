let replaceDescription;
let replaceImage;

function levelThreeConsole(name, input){
    switch(name){
        case 'Sokudo':
            return includeSokudo(input);
        case 'Puzzle':
            return includePuzzle(input);
        case 'Audio-Language':
            return includeAudio(input);
        case 'Coding':
            return includeCode(input);
    }
}

//function
function includeSokudo(input){
    replaceDescription = "";
    replaceImage= "";
    if (hasSokudoAns(input)){
        return new Array(true, replaceDescription,replaceImage);
    }
    return new Array(false, replaceDescription);
}

function includePuzzle(input){
    replaceDescription = "";
    replaceImage = "";
    if (hasPuzzleAns(input)){
        return new Array(true, replaceDescription);
    }
    return new Array(false, replaceDescription);
}

function includeAudio(input){
    replaceDescription =  "";
    replaceImage = "";
    if (hasAudioAns(input)){
        return new Array(true, replaceDescription);
    }
    return new Array(false, replaceDescription);
}

function includeCode(input){
    replaceDescription = "";
    replaceImage = "";
    if (hasCodeAns(input)){
        return new Array(true, replaceDescription);
    }
    return new Array(false,replaceDescription);
}
//end function

//check input
function hasSokudoAns(input){
    return input.includes(14231423);
}
function hasPuzzleAns(input){
    return input.toLowerCase().includes("towel")
}
function hasAudioAns(input){
    return input.toLowerCase().includes("meow");
}
function hasCodeAns(input){
    return input.includes("n2");
}



export default levelThreeConsole;
