// GameUI function controls created elements and stats display in user interface
const GameUI = (function ()
{
    const gameData = {
        title: sessionStorage.getItem('gameLink'),
        description: 'Find out what sentence is hidden by guessing letters every turn. You start with 5 points. If you guess wrong you will lose 1 point. Getting to 0 points - game ends.'
    }

    const selectUI = {
        header: document.querySelector('#playHeader'),
        description: document.querySelector('#descriptionHeader'),
        statBox: document.querySelector('#statBox'),
        gameBoard: document.querySelector('#gameBoard'),
        gameBoardUpper: document.querySelector('#gameBoardUpper'),
        gameBoardLower: document.querySelector('#gameBoardLower')
    }

    function detailsBoxUI()
    {
        const gameTitle = document.createElement('h1');

        gameTitle.classList.add('display-4', 'text-center');
        gameTitle.innerText = gameData.title;

        selectUI.header.appendChild(gameTitle);
        selectUI.description.innerText = gameData.description;
    }

    function statBoxUI()
    {
        const attempt = document.createElement('div'),
              level = document.createElement('div'),
              score = document.createElement('div');

        score.classList.add('col', 'mb-3');
        score.style.fontSize = 'x-large';
        score.setAttribute('id', 'score-table');

        level.classList.add('col', 'mb-3');
        level.style.fontSize = 'x-large';
        level.setAttribute('id', 'level-table');

        attempt.classList.add('col', 'mb-3');
        attempt.style.fontSize = 'x-large';
        attempt.setAttribute('id', 'attempt-table');

        selectUI.statBox.appendChild(score);
        selectUI.statBox.appendChild(level);
        selectUI.statBox.appendChild(attempt);
    }

    function gameBoardUpperUI()
    {
        const hintBox = document.createElement('div');

        hintBox.classList.add('p-3', 'text-center');
        hintBox.style.fontSize = 'x-large';
        hintBox.setAttribute('id', 'hint-box');

        selectUI.gameBoardUpper.style.fontSize = 'x-large';
        selectUI.gameBoardUpper.style.letterSpacing = "10px";

        selectUI.gameBoard.insertBefore(hintBox, selectUI.gameBoardUpper);
    }

    function gameBoardLowerUI()
    {
        const inputDiv = document.createElement('div'),
              userInput = document.createElement('input'),
              button = document.createElement('button');

        selectUI.gameBoardLower.appendChild(inputDiv);

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
        gameData,
        selectUI,
        init: function()
        {
            detailsBoxUI();
            statBoxUI();
            gameBoardUpperUI();
            gameBoardLowerUI();
        },
        updateStats: function(score, level, attempts, hint)
        {
            const getScoreTable = document.getElementById('score-table'),
                  getLevelTable = document.getElementById('level-table'),
                  getAttemptTable = document.getElementById('attempt-table'),
                  getHintBox = document.getElementById('hint-box');

            getScoreTable.innerText = `Score: ${score}`;
            getLevelTable.innerText = `Level: ${level}`;
            getAttemptTable.innerText = `Attempts: ${attempts}`;
            getHintBox.innerText = `Hint: ${hint}`;
        },
        updateSentence: function(sentenceProgress)
        {
            selectUI.gameBoardUpper.innerText = sentenceProgress;
        },
        displayAlert: function(letter, alert, isGuessed)
        {
            if(document.querySelector('.no_letter')) GameUI.selectUI.gameBoard.removeChild(document.querySelector('.no_letter'));

            alert.classList.add('alert', 'alert-danger', 'text-center', 'no_letter');
            alert.setAttribute('role', 'alert');

            if(isGuessed)
            {
                alert.innerText = `ALREADY GUESSED ${letter.toUpperCase()}`;
            }
            else
            {
                alert.innerText = `NO LETTER ${letter.toUpperCase()}`;
            }
        }
    }
})();

export default GameUI;
