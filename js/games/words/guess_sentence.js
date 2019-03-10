/*
    Main game variables (destructuring is used beneath every object declaration):
        - gameVariables (title, description, grab existing UI elements)
        - HelperFunctions (short functions that help calculate or display something)
        - gameSelected (variables that game is currently working with)
        - gameState (state of the game at the given moment)
*/

let gameVariables = {
    gameData: {
        title: sessionStorage.getItem('gameLink'),
        description: 'Find out what sentence is hidden by guessing letters every turn. You start with 5 points. If you guess wrong you will lose 1 point. Getting to 0 points - game ends.',
        sentenceList: {
            level1: [
                {
                    hint: 'Question',
                    content: 'Hello'
                },
                {
                    hint: 'Question',
                    content: 'Are you going to school today?'
                },
                {
                    hint: 'Question',
                    content: 'Are you going to school today?'
                }
            ]
        }
    },
    selectUI: {
        header: document.querySelector('#playHeader'),
        description: document.querySelector('#descriptionHeader'),
        statBox: document.querySelector('#statBox'),
        gameBoard: document.querySelector('#gameBoard'),
        gameBoardUpper: document.querySelector('#gameBoardUpper'),
        gameBoardLower: document.querySelector('#gameBoardLower')
    }
}
    let { title, description } = gameVariables.gameData;

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

let gameSelected = {
    currentHint: gameVariables.gameData.sentenceList.level1[0].hint,
    currentSentence: gameVariables.gameData.sentenceList.level1[0].content
}
    let { currentHint, currentSentence } = gameSelected;

let gameState = {
    isLost: false,
    highScore: 0,
    currentLevel: 1,
    currentScore: 5, // TODO change to attemptsLeft
    sentenceProgress: HelperFunctions.getEmpty(currentSentence),
    lettersLeft: currentSentence.replace(/[^a-zA-Z]/g, "").length
}
    let { isLost, highScore, currentLevel, currentScore, sentenceProgress, lettersLeft } = gameState;

/*
    GameUI function that controls created elements and stats display
*/

const GameUI = (function ()
{
    function statBoxUI()
    {
        const attempt = document.createElement('div'),
              level = document.createElement('div'),
              score = document.createElement('div');

        score.classList.add('col', 'mb-3');
        score.style.fontSize = 'x-large';
        score.setAttribute('id', 'score-table');
        score.innerText = `Score: ${highScore}`;

        level.classList.add('col', 'mb-3');
        level.style.fontSize = 'x-large';
        level.setAttribute('id', 'level-table');
        level.innerText = `Level: ${currentLevel}`;

        attempt.classList.add('col', 'mb-3');
        attempt.style.fontSize = 'x-large';
        attempt.setAttribute('id', 'attempt-table');
        attempt.innerText = `Attempts: ${currentScore}`;

        gameVariables.selectUI.statBox.appendChild(score);
        gameVariables.selectUI.statBox.appendChild(level);
        gameVariables.selectUI.statBox.appendChild(attempt);
    }

    function gameBoardUpperUI()
    {
        const gameTitle = document.createElement('h1');

        gameTitle.classList.add('display-4', 'text-center');
        gameTitle.innerText = title;

        gameVariables.selectUI.header.appendChild(gameTitle);
        gameVariables.selectUI.gameBoardUpper.style.fontSize = 'x-large';
        gameVariables.selectUI.gameBoardUpper.style.letterSpacing = "10px";
        gameVariables.selectUI.gameBoardUpper.innerText = sentenceProgress;
        gameVariables.selectUI.description.innerText = description;
    }

    function gameBoardLowerUI()
    {
        const inputDiv = document.createElement('div'),
              userInput = document.createElement('input'),
              button = document.createElement('button');

        gameVariables.selectUI.gameBoardLower.appendChild(inputDiv);

        inputDiv.classList.add('p-3');
        inputDiv.style.fontSize = 'x-large';

        userInput.classList.add('text-center');
        userInput.setAttribute('id', 'user-input');
        userInput.setAttribute('type', 'text');
        userInput.setAttribute('size', '1');
        userInput.setAttribute('maxlength', '1');

        button.classList.add('btn', 'btn-success', 'ml-2', 'mb-2');
        button.setAttribute('id', 'try-btn');
        button.innerText = 'Try';

        inputDiv.innerText = 'Letter: ';
        inputDiv.appendChild(userInput);
        inputDiv.appendChild(button);
    }

    return {
        init: function()
        {
            statBoxUI();
            gameBoardUpperUI();
            gameBoardLowerUI();
        },
        update: function(score, level, attempts)
        {
            const getScoreTable = document.getElementById('score-table'),
                  getLevelTable = document.getElementById('level-table'),
                  getAttemptTable = document.getElementById('attempt-table');

            getScoreTable.innerText = `Score: ${score}`;
            getLevelTable.innerText = `Level: ${level}`;
            getAttemptTable.innerText = `Attempts: ${attempts}`;
        }
    }
})();

/*
    Main game executable function
*/

const GuessSentence = (function (gameUI, helperFunctions)
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
            if(isLost) window.location.reload();

            letter = userInput.value;

            const alert = document.createElement('div');

            if(document.querySelector('.alert'))
            {
                gameVariables.selectUI.gameBoard.removeChild(document.querySelector('.alert'));
            }

            alert.classList.add('alert', 'alert-danger', 'text-center');
            alert.setAttribute('role', 'alert');
            alert.innerText = `NO LETTER ${letter.toUpperCase()}`;

            if(currentSentence.includes(letter))
            {
                sentenceProgress = helperFunctions.setProgressSentence(currentSentence, sentenceProgress, letter);
                let number = helperFunctions.getGuessedCount(currentSentence, sentenceProgress, letter);
                lettersLeft -= number;
                gameVariables.selectUI.gameBoardUpper.innerText = sentenceProgress;
            }
            else
            {
                gameVariables.selectUI.gameBoard.insertBefore(alert, gameBoardUpper);
                currentScore--;
                if(currentScore == 0)
                {
                    isLost = true;
                    helperFunctions.gameOver();
                }
                attempt.innerText = `Score: ${currentScore}`;
            }

            if(lettersLeft == 0) newLevel();
        }
    }

    function newLevel()
    {
        highScore += currentScore;
        currentScore = 5;
        currentLevel++;

        GameUI.update(highScore, currentLevel, currentScore);
    }

    return {
        init: function()
        {
            gameUI.init();
            executeGame();
        }
    }

})(GameUI, HelperFunctions);

GuessSentence.init();
