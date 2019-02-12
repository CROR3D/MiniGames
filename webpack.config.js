const path = require('path');

module.exports = [
    {
        mode: "development",
        entry: "./js/app",
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "app.bundle.js",
        }
    },
    {
        mode: "development",
        entry: "./js/games/controller",
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "play.bundle.js",
        }
    }
]
