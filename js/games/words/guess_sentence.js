const GameUI = (function ()
{
    function gameBoardUpperUI()
    {
        const playHeader = document.querySelector('#playHeader'),
              gameBoard = document.querySelector('#gameBoard'),
              gameBoardUpper = document.querySelector('#gameBoardUpper'),
              gameTitle = document.createElement('h1'),
              hint = document.createElement('p');

        gameTitle.classList.add('display-4', 'text-center');
        gameTitle.innerText = 'Guess Sentence';

        playHeader.appendChild(gameTitle);
        gameBoardUpper.style.fontSize = 'x-large';
        gameBoardUpper.style.letterSpacing = "10px";
        gameBoardUpper.innerText = 'sentenceProgress';

        hint.classList.add('text-center', 'mb-3');
        hint.style.fontSize = 'x-large';
        hint.innerText = 'Hint: ';

        gameBoard.insertBefore(hint, gameBoardUpper);
    }

    function gameBoardLowerUI()
    {
        const gameBoardLower = document.querySelector('#gameBoardLower'),
              score = document.createElement('div'),
              inputDiv = document.createElement('div'),
              userInput = document.createElement('input'),
              button = document.createElement('button');

        gameBoardLower.classList.add('row');

        gameBoardLower.appendChild(score);
        gameBoardLower.appendChild(inputDiv);

        score.classList.add('text-left', 'p-3');
        score.style.fontSize = 'x-large';

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

        score.setAttribute('id', 'score-table');
        score.innerText = 'Score: ';
        inputDiv.innerText = 'Letter: ';
        inputDiv.appendChild(userInput);
        inputDiv.appendChild(button);
    }

    return {
        init: function()
        {
            gameBoardUpperUI();
            gameBoardLowerUI();
        }
    }
})();

const GuessSentence = (function (gameUI)
{
    const title = sessionStorage.getItem('gameLink'),
          description = 'Find out what sentence is hidden by guessing letters every turn. You start with 5 points. If you guess wrong you will lose 1 point. Getting to 0 points - game ends.';

    let sentence = {
        hint: 'Question',
        content: 'Are you going to school today?'
    }

    let pickedSentence = sentence.content;
        totalScore = 5,
        lettersCount = pickedSentence.length,
        sentenceProgress = getEmpty(),
        modal = document.querySelector('#modal'),
        modalTitle = document.querySelector('#modal-title'),
        letter = '',
        isLost = false;

    function getEmpty()
    {
        let array = [];

        for (var i = 0; i < lettersCount; i++) {
            if(pickedSentence[i] == ' ') array.push('\xa0');
            if(pickedSentence[i] != ' ') array.push('_');
            if(pickedSentence[i] == '?' || pickedSentence[i] == '!') array.push(pickedSentence[i]);
        }

        array = array.join('');
        return array.toString();
    }

    function setProgressSentence(progress, letter)
    {
        let array = [];

        for (var i = 0; i <= lettersCount; i++) {
            if(pickedSentence[i] == letter)
            {
                array.push(letter);
            }
            else
            {
                array.push(progress[i]);
            }
        }

        array = array.join('');
        sentenceProgress = array.toString();
    }

    function executeGame(sentence)
    {
        const tryBtn = document.getElementById('try-btn'),
              userInput = document.getElementById('user-input'),
              gameBoardUpper = document.querySelector('#gameBoardUpper'),
              score = document.getElementById('score-table');

        tryBtn.addEventListener('click', letterAttempt);

        function letterAttempt()
        {
            if(isLost) window.location.reload();

            letter = userInput.value;

            const alert = document.createElement('div'),
                  gameBoard = document.querySelector('#gameBoard');

                  if(document.querySelector('.alert'))
                  {
                      gameBoard.removeChild(document.querySelector('.alert'));
                  }

            alert.classList.add('alert', 'alert-danger', 'text-center');
            alert.setAttribute('role', 'alert');
            alert.innerText = `NO LETTER ${letter.toUpperCase()}`;

            if(pickedSentence.includes(letter))
            {
                setProgressSentence(sentenceProgress, letter);
                gameBoardUpper.innerText = sentenceProgress;
            }
            else
            {
                gameBoard.insertBefore(alert, gameBoardUpper);
                totalScore--;
                if(totalScore == 0)
                {
                    isLost = true;
                    modal.style.display = 'block';
                    modalTitle.innerText = 'GAME OVER';
                }
                score.innerText = `Score: ${totalScore}`;
            }
        }
    }

    return {
        init: function()
        {
            gameUI.init();
            executeGame(pickedSentence);
        }
    }

})(GameUI);

GuessSentence.init();
