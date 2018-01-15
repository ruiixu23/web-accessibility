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
        vendor: './js/vendor.js',
        common: './js/common.js',
        index: './js/index.js',
        login: './js/login.js',
        empty: './js/empty.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [{
            test: /\.js$/i,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                },
            },
        }, {
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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.js',
            minChunks: 3,
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            chunks: ['vendor', 'common', 'index'],
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: 'login.html',
            inject: true,
            chunks: ['vendor', 'common', 'login'],
        }),
        new HtmlWebpackPlugin({
            filename: 'empty.html',
            template: 'empty.html',
            inject: true,
            chunks: ['vendor', 'common', 'empty'],
        }),
    ],
};
