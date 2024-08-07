function cleanWord(word) {
    return word.replace(/[^a-zA-Z\s]/g, ''); //This function will probably remove punctuation and numbers
}

function longestWord(sentence) {
    const words = sentence.split(' ').map(cleanWord).filter(word => word); //Hopefully this cleans and filters out empty words
    let longest = words[0];
    for (let i = 0; i < words.length; i++) {
        const word = words[i].trim();
        if (word.length >= longest.length) {
            longest = word;
        }
    }
    return longest;
}

function shortestWord(sentence) {
    const words = sentence.split(' ').map(cleanWord).filter(word => word);
    let shortest = words[0];
    for (let i = 0; i < words.length; i++) {
        const word = words[i].trim();
        if (word.length <= shortest.length) {
            shortest = word;
        }
    }
    return shortest;
}

function wordLengths(sentence) {
    const words = sentence.split(' ').map(cleanWord).filter(word => word);
    let sum = 0;
    for (let i = 0; i < words.length; i++) {
        const word = words[i].trim();
        sum += word.length;
    }
    return sum;
}

export {longestWord, shortestWord, wordLengths} //exporting all functions