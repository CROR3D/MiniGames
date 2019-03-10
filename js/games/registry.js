/* Import all main game files */
import GuessSentence from './words/guess_sentence/guess_sentence';

/* Register game by defining the name and executable function */
const Registry = (function()
{
    const gamesList = {
        Words: [
            {
                gameName: 'Guess Sentence',
                executable: GuessSentence
            },
            {
                gameName: 'Find Words',
                executable: 'find_words'
            }
        ],
        Numbers: [
            {
                gameName: 'Get the Number',
                executable: 'get_the_number'
            }
        ],
        Pictures: [
            {
                gameName: 'Puzzle',
                executable: 'puzzle'
            }
        ]
    }

    return {
        gamesList
    }
})();

export default Registry;
