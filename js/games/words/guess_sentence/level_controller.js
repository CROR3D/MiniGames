// LevelCtrl makes game use different data and state based on current level
const LevelCtrl = (function ()
{
    const levels = {
        level1: [
            {
                hint: 'Movie',
                content: 'Independence day'
            },
            {
                hint: 'Book',
                content: 'Green mile'
            },
            {
                hint: 'Singer',
                content: 'Weird Al Yankovic'
            }
        ],
        level2: [
            {
                hint: 'Movie',
                content: 'How to train your dragon'
            },
            {
                hint: 'Book',
                content: 'The man in the High Castle'
            },
            {
                hint: 'Band',
                content: 'Red hot chili peppers'
            }
        ]
    }

    return {
        selectSentence: function(level = 1)
        {
            let gameSelected,
                currentLevelArray = levels['level' + level],
                sentenceCount = currentLevelArray.length,
                getSentence = currentLevelArray[getRandom(sentenceCount)];

            function getRandom(max) {
                return Math.floor(Math.random() * max);
            }

            return getSentence;
        }
    }

})();

export default LevelCtrl;
