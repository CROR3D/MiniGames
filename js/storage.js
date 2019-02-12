const Storage = (function()
{
    return {
        storeHighScores: function()
        {

        },
        getLinkData: function()
        {
            sessionStorage.setItem('gameType', this.title);
            sessionStorage.setItem('gameLink', this.innerText);
        },
        storeArticle: function(title, text)
        {
            let article = {
                title: title,
                text: text
            }

            let store = JSON.stringify(article);
            localStorage.setItem('article', store);
        }
    }
})();

export { Storage };
