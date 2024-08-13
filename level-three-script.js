let replaceDescription;

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
    if (hasSokudoAns(input)){
        return new Array(true, replaceDescription);
    }
    return new Array(false, replaceDescription);
}

function includePuzzle(input){
    replaceDescription = "";
    if (hasPuzzleAns(input)){
        return new Array(true, replaceDescription);
    }
    return new Array(false, replaceDescription);
}

function includeAudio(input){
    replaceDescription =  "";
    if (hasAudioAns(input)){
        return new Array(true, replaceDescription);
    }
    return new Array(false, replaceDescription);
}

function includeCode(input){
    replaceDescription = "";
    if (hasCodeAns(input)){
        return new Array(true, replaceDescription);
    }
    return new Array(false,replaceDescription);
}
//end function

//check input
function hasSokudoAns(input){
    return input.includes(1234);
}
function hasPuzzleAns(input){
    return input.toLowerCase().includes("Answer")
}
function hasAudioAns(input){
    return input.toLowerCase().includes("Audio");
}
function hasCodeAns(input){
    return input.includes("n2");
}



export default levelThreeConsole;
