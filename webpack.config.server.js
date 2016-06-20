var webpack = require("webpack");
var path = require('path');
var fs = require('fs');
var nodeModules = {};

// note the path.resolve(__dirname, ...) part
// without it, eslint-import-resolver-webpack fails
// since eslint might be invoked with different cwd
fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

module.exports = {
    target: "node",
    externals: nodeModules,
    node: {
      __dirname: true
    },
    entry: ["server", "server.socket"],
    resolve: {
        root: [ path.resolve("./src") ],
        extensions: ["", ".js"]
    },
    output: {
        path: "./",
        filename: "server.js"
    },
    module: {
        loaders: [
            {
                test: /\.json$/, loader: "json-loader"
            },
            {
                test: /\.js?/,
                exclude: /(node_modules|bower_components)/,
                loaders: ["babel"]
            }
        ]
    }
}
