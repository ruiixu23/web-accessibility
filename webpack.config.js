
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    devServer: {
        contentBase: './src',
    },
    devtool: 'cheap-module-eval-source-map',
    context: path.resolve(__dirname, 'src'),
    entry: {
        vendors: './js/vendors.js',
        common: './js/common.js',
        index: './js/index.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [{
            test: /\.scss$/i,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader'],
            }),
        }, {
            test: /.*\.html$/i,
            use: ['html-loader'],
        }, {
            test: /.*\.(gif|png|jpe?g)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]',
                },
            }],
        }],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            chunks: ['vendors', 'common', 'index'],
        }),
    ],
};
