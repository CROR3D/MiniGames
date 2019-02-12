import { Registry } from './registry';

const Ctrl = (function(registry)
{
    const gameType = sessionStorage.getItem('gameType'),
          gameName = sessionStorage.getItem('gameLink');

    let scriptName;

    registry.gamesList[gameType].forEach(function(array) {
        if(array.includes(gameName)) scriptName = array[1];
    });

    return {
        callGameScript: function()
        {
            const script = document.createElement('script');
            script.setAttribute('src', `js/games/${gameType.toLowerCase()}/${scriptName}.js`);
            document.body.appendChild(script);
        }
    }
})(Registry);

Ctrl.callGameScript();
