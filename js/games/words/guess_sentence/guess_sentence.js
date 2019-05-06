import GameUI from './game_ui';
import LevelCtrl from './level_controller';

/* HelperFunctions (short functions that help calculate or display something) */
const HelperFunctions = (function ()
{
    return {
        gameOver: function()
        {
            if(confirm("Do you want to restart?"))
            {
                window.location.reload();
            }
        },
        getEmpty: function(sentence)
        {
            let array = [];

            for (var i = 0; i < sentence.length; i++) {
                if(sentence[i] == ' ') array.push('\xa0');
                if(sentence[i] != ' ') array.push('_');
                if(sentence[i] == '?' || sentence[i] == '!') array.push(sentence[i]);
            }
            array = array.join('');

            return array.toString();
        },
        setProgressSentence: function(sentence, progress, letter)
        {
            let array = [];

            for (var i = 0; i <= sentence.length; i++) {
                if(sentence[i] == letter)
                {
                    array.push(letter);
                }
                else
                {
                    array.push(progress[i]);
                }
            }

            array = array.join('');
            return array.toString();
        },
        getGuessedCount: function(sentence, progress, letter)
        {
            let count = 0;

            for (var i = 0; i <= sentence.length; i++) {
                if(sentence[i] == letter) count++;
            }
            return count;
        }
    }
})();

/* gameSelected (sentence that game is currently working with) */
let gameSelected = LevelCtrl.selectSentence();

/* gameState (state of the game at the given moment) */
let gameState = {
    isLost: false,
    highScore: 0,
    currentLevel: 1,
    attemptsLeft: 5,
    sentenceProgress: HelperFunctions.getEmpty(gameSelected.content),
    lettersLeft: gameSelected.content.replace(/[^a-zA-Z]/g, "").length
}

/* Main game executable function */
const GuessSentence = (function ()
{
    let letter = '';

    function executeGame()
    {
        const tryBtn = document.getElementById('try-btn'),
              userInput = document.getElementById('user-input'),
              attempt = document.getElementById('attempt-table');

        tryBtn.addEventListener('click', letterAttempt);

        function letterAttempt()
        {
            if(gameState.isLost) window.location.reload();

            letter = userInput.value;

            if(document.querySelector('.no_letter')) GameUI.selectUI.gameBoard.removeChild(document.querySelector('.no_letter'));

            if(gameSelected.content.includes(letter) && !gameState.sentenceProgress.includes(letter))
            {
                gameState.sentenceProgress = HelperFunctions.setProgressSentence(gameSelected.content, gameState.sentenceProgress, letter);
                let number = HelperFunctions.getGuessedCount(gameSelected.content, gameState.sentenceProgress, letter);
                gameState.lettersLeft -= number;
                GameUI.updateSentence(gameState.sentenceProgress);
            }
            else
            {
                const alert = document.createElement('div');

                if(gameState.sentenceProgress.includes(letter)  && letter != '')
                {
                    GameUI.displayAlert(letter, alert, true);
                }
                else
                {
                    GameUI.displayAlert(letter, alert, false);
                }

                GameUI.selectUI.gameBoard.insertBefore(alert, GameUI.selectUI.gameBoardUpper);
                gameState.attemptsLeft--;
                if(gameState.attemptsLeft === 0)
                {
                    gameState.isLost = true;
                    HelperFunctions.gameOver();
                }
                attempt.innerText = `Score: ${gameState.attemptsLeft}`;
            }

            if(gameState.lettersLeft === 0) newLevel();
        }
    }

    function newLevel()
    {
        gameState.highScore += gameState.attemptsLeft;
        gameState.attemptsLeft = 5;
        gameState.currentLevel++;

        GameUI.updateStats(gameState.highScore, gameState.currentLevel, gameState.attemptsLeft, gameSelected.hint);
        gameSelected = LevelCtrl.selectSentence(gameState.currentLevel);
        gameState.lettersLeft = gameSelected.content.replace(/[^a-zA-Z]/g, "").length;
        gameState.sentenceProgress = HelperFunctions.getEmpty(gameSelected.content);
        GameUI.selectUI.gameBoardUpper.innerText = gameState.sentenceProgress;
    }

    return {
        letter,
        init: function()
        {
            GameUI.init();
            GameUI.updateSentence(gameState.sentenceProgress);
            GameUI.updateStats(gameState.highScore, gameState.currentLevel, gameState.attemptsLeft, gameSelected.hint);
            executeGame();
        }
    }
})();

export default GuessSentence;
