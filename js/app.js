import UI from './ui';
import Storage from './storage';

const App = (function ()
{
    function activateGameLinks()
    {
        const gameLinks = document.querySelectorAll('.games-list a');

        gameLinks.forEach(function(a) {
            a.addEventListener('click', Storage.getLinkData);
        });
    }

    return {
        init: function()
        {
            UI.dropdownCategories();

            // Display Articles from local storage

            activateGameLinks();
        }
    }
})();

App.init();
