const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const dotEnv = require('dotenv-webpack');
const { watch } = require('fs');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [miniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
            },
            {
                test: /\.png$/,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false
                    }
                }
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: true
        }),
        new miniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new copyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,"src",'assets/images'),
                    to: 'assets/images'
                }
            ]
        }),
        new dotEnv()
    ]
}