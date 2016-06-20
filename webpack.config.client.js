var webpack = require("webpack");
var path = require('path');

module.exports = {
    devTool: "source-map",
    devServer: {
        host: "localhost",
        port: "8080",
        contentBase: "www/",
        colors: true,
        inline: true,
        hot: true
    },
    entry: {
      "www/js/bundle": "client"
    },
    resolve: {
        root: [ path.resolve("./src") ],
        extensions: ["", ".js"]
    },
    output: {
        path: "./",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                exclude: /(node_modules|bower_components)/,
                loaders: ["babel"]
            }
        ]
    }
}
