const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill','./src/js/index.js'], //babel polyfill is used to provide ES5 implementations to things that were added in >=ES6 e.g. Promises
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html' //could be automatically generated
        })
    ],
    module: {
        rules: [ //all the loaders - each an object
            {
                test: /\.js$/, //look for all files and test if ending in .js
                exclude: /node_modules/,
                use: { //for the files that match use this loader
                    loader: 'babel-loader'
                }
            }
        ]
    }
};