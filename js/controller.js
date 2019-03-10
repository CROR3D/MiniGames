import Registry from './games/registry';

const Ctrl = (function()
{
    const gameType = sessionStorage.getItem('gameType'),
          gameName = sessionStorage.getItem('gameLink');

    let gameObject = Registry.gamesList[gameType].find(object => {
        return object.gameName === gameName;
    });

    return {
        callGameScript: function()
        {
            gameObject.executable.init();
        }
    }
})();

Ctrl.callGameScript();
