var gameVariables = {
    gameData: {
        title: sessionStorage.getItem('gameLink'),
        description: 'Find out what sentence is hidden by guessing letters every turn. You start with 5 points. If you guess wrong you will lose 1 point. Getting to 0 points - game ends.',
        sentenceList: {
            level1: [
                {
                    hint: 'Question',
                    content: 'Are you going to school today?'
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
        gameBoardLower: document.querySelector('#gameBoardLower'),
        modal: document.querySelector('#modal'),
        modalTitle: document.querySelector('#modal-title')
    }
}

const HelperFunctions = (function ()
{
    return {
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
        }
    }
})();

var gameSelected = {
    currentHint: gameVariables.gameData.sentenceList.level1[0].hint,
    currentSentence: gameVariables.gameData.sentenceList.level1[0].content
}

var gameState = {
    isLost: false,
    highScore: 0,
    currentLevel: 1,
    currentScore: 5,
    sentenceProgress: HelperFunctions.getEmpty(gameSelected.currentSentence)
}

const GameUI = (function ()
{
    function statBoxUI()
    {
        const hint = document.createElement('div'),
              level = document.createElement('div'),
              score = document.createElement('div');

        hint.classList.add('col', 'mb-3');
        hint.style.fontSize = 'x-large';
        hint.innerText = `Hint: ${gameSelected.currentHint}`;

        level.classList.add('col', 'mb-3');
        level.style.fontSize = 'x-large';
        level.innerText = `Level: ${gameState.currentLevel}`;

        score.classList.add('col', 'mb-3');
        score.style.fontSize = 'x-large';
        score.setAttribute('id', 'score-table');
        score.innerText = `Score: ${gameState.currentScore}`;

        gameVariables.selectUI.statBox.appendChild(hint);
        gameVariables.selectUI.statBox.appendChild(level);
        gameVariables.selectUI.statBox.appendChild(score);
    }

    function gameBoardUpperUI()
    {
        const gameTitle = document.createElement('h1');

        gameTitle.classList.add('display-4', 'text-center');
        gameTitle.innerText = gameVariables.gameData.title;

        gameVariables.selectUI.header.appendChild(gameTitle);
        gameVariables.selectUI.gameBoardUpper.style.fontSize = 'x-large';
        gameVariables.selectUI.gameBoardUpper.style.letterSpacing = "10px";
        gameVariables.selectUI.gameBoardUpper.innerText = gameState.sentenceProgress;
        gameVariables.selectUI.description.innerText = gameVariables.gameData.description;
    }

    function gameBoardLowerUI()
    {
        const inputDiv = document.createElement('div'),
              userInput = document.createElement('input'),
              button = document.createElement('button');

        gameVariables.selectUI.gameBoardLower.classList.add('row');

        gameVariables.selectUI.gameBoardLower.appendChild(inputDiv);

        inputDiv.classList.add('p-3');
        inputDiv.style.fontSize = 'x-large';

        userInput.classList.add('text-center');
        userInput.setAttribute('id', 'user-input');
        userInput.setAttribute('type', 'text');
        userInput.setAttribute('size', '1');
        userInput.setAttribute('maxlength', '1');

        button.classList.add('btn', 'btn-secondary', 'ml-2', 'mb-2');
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
        }
    }
})();

const GuessSentence = (function (gameUI, helperFunctions)
{
    let letter = '';

    function executeGame(sentence)
    {
        const tryBtn = document.getElementById('try-btn'),
              userInput = document.getElementById('user-input'),
              score = document.getElementById('score-table');

        tryBtn.addEventListener('click', letterAttempt);

        function letterAttempt()
        {
            if(gameState.isLost) window.location.reload();

            letter = userInput.value;

            const alert = document.createElement('div');

                  if(document.querySelector('.alert'))
                  {
                      gameVariables.selectUI.gameBoard.removeChild(document.querySelector('.alert'));
                  }

            alert.classList.add('alert', 'alert-danger', 'text-center');
            alert.setAttribute('role', 'alert');
            alert.innerText = `NO LETTER ${letter.toUpperCase()}`;

            if(gameSelected.currentSentence.includes(letter))
            {
                gameState.sentenceProgress = helperFunctions.setProgressSentence(gameSelected.currentSentence, gameState.sentenceProgress, letter);
                gameVariables.selectUI.gameBoardUpper.innerText = gameState.sentenceProgress;
            }
            else
            {
                gameVariables.selectUI.gameBoard.insertBefore(alert, gameBoardUpper);
                gameState.currentScore--;
                if(gameState.currentScore == 0)
                {
                    gameState.isLost = true;
                    gameVariables.selectUI.modal.style.display = 'block';
                    gameVariables.selectUI.modalTitle.innerText = 'GAME OVER';
                }
                score.innerText = `Score: ${gameState.currentScore}`;
            }
        }
    }

    return {
        init: function()
        {
            gameUI.init();
            executeGame(gameState.currentSentence);
        }
    }

})(GameUI, HelperFunctions);

GuessSentence.init();
