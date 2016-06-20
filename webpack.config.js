var webpack = require("webpack");
var path = require('path');

module.exports = {
    // devTool: "source-map",
    // devServer: {
    //     host: "localhost",
    //     port: "8080",
    //     contentBase: "www/",
    //     colors: true,
    //     inline: true,
    //     hot: true
    // },
    entry: {
      client: "client"
    },
    resolve: {
        root: [ path.resolve("./src") ],
        extensions: ["", ".js"]
    },
    output: {
        path: __dirname + "/www/js",
        filename: "bundle.js",
        publicPath: "/js/"
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                exclude: /(node_modules|bower_components)/,
                loaders: ["babel"]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            __DEVELOPMENT__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'development'))
        })
    ]
}
