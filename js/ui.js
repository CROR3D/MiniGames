import { Registry } from './games/registry';

const UI = (function(registry)
{
    const news = document.getElementById('news-div');

    return {
        displayArticle: function(title, text)
        {
            const card = document.createElement('div'),
                cardHeader = document.createElement('div'),
                cardBody = document.createElement('div');

            card.classList.add('card', 'mt-5');

            cardHeader.classList.add('card-header');
            cardHeader.innerText = title;

            cardBody.classList.add('card-body');
            cardBody.innerText = text;

            news.appendChild(card);
            card.appendChild(cardHeader);
            card.appendChild(cardBody);
        },
        dropdownCategories: function()
        {
            const gameCategories = document.getElementById('gameCategories');

            for(let type in registry.gamesList) {
                const gameDiv = document.createElement('div'),
                    anchor = document.createElement('a');
                let arrayLength = registry.gamesList[type].length;

                anchor.classList.add('dropdown-item', 'dropdown-category');
                anchor.innerText = type;
                gameCategories.appendChild(anchor);

                gameDiv.classList.add('dropdown-menu', 'games-list', 'custom-dropdown');
                anchor.parentNode.insertBefore(gameDiv, anchor.nextSibling);

                for(let i = 0; i < arrayLength; i++) {
                    const gameAnchor = document.createElement('a'),
                          game = registry.gamesList[type][i][0];

                    gameAnchor.classList.add('dropdown-item');
                    gameAnchor.title = type;
                    gameAnchor.href = 'play.php';
                    gameAnchor.innerText = game;
                    gameDiv.appendChild(gameAnchor);
                }
            }
        },
        showGamePage: function()
        {

        }
    }
})(Registry);

export { UI };
