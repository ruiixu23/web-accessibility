const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
    },
    devtool: 'cheap-module-eval-source-map',
    context: path.resolve(__dirname, 'src'),
    entry: {
        vendors: './js/vendors.js',
        index: './js/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist', 'assets'),
        publicPath: '/assets',
    },
    module: {
        rules: [{
            test: /\.css$/i,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader'],
            }),
        }],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
        }),
    ],
};
