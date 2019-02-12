import { UI } from './ui';
import { Storage } from './storage';

const App = (function (ui, storage)
{
    function activateGameLinks()
    {
        const gameLinks = document.querySelectorAll('.games-list a');

        gameLinks.forEach(function(a) {
            a.addEventListener('click', storage.getLinkData);
        });
    }

    return {
        init: function()
        {
            ui.dropdownCategories();

            // Display Articles from local storage

            activateGameLinks();
        }
    }
})(UI, Storage);

App.init();
