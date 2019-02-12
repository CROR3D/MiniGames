const Registry = (function()
{
    // Add gameName and scriptName
    const gamesList = {
        Words: [
            ['Guess Sentence', 'guess_sentence'],
            ['Flip Letters', 'flip_letters'],
            ['Find Words', 'find_words']
        ],
        Numbers: [
            ['Mathematic', 'mathematic']
        ],
        Pictures: []
    }

    return {
        gamesList
    }
})();

export { Registry };
