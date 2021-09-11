const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin= require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    optimization: {
        minimizer: [new UglifyJsPlugin()],
      },
    
    entry : {
        directore : './src/js/index.js',
        jquery : './node_modules/jquery/dist/jquery.min.js'
    },
    output : {
        filename : '[name].[contenthash].js', 
        path : path.resolve(__dirname , 'dist')
    },
    module: {
        rules: [
            {
                test : /\.css$/,
                use : [MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.js$/,
                exclude : /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            },
            {
                test : /\.s[ac]ss$/,
                use : ['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|jpg|gif|svg)$/,
                use: {
                   loader: 'file-loader',
                    options: {
                        outputPath: '../assets/images',
                        name : '[name].[ext]',
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                   loader: 'file-loader',
                    options: {
                        outputPath: './fonts',
                        name: '[name].[ext]',
                        limit: false,
                    }
                }
            },
        ],

    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        // new htmlWebpackPlugin({
        //     filename : "newtemp2.html",
        //     inject: false,
        //     templateContent : ({htmlWebpackPlugin}) => `
        //     <!DOCTYPE html>
        //     <html lang="fa">
        //     <head>
        //         <meta charset="UTF-8">
        //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
        //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //         <!-- JQ -->
        //         <script src="node_modules/jquery/dist/jquery.min.js"></script>
        //         <title> ECMA script </title>
        //     <script defer src="bundle.js"></script></head>
            
            
        //     <body class="container" id="elimg">
        //     به نام خدا 
                
            
                
        //         <button class="btn btn-danger mt-5 mx-auto"> test <i class="bi bi-telegram"></i> </button>
            
                
        //         <!-- bundle -->
        //         <script src="dist/bundle.js"></script>
        //     </body>
        //     </html>
        //     `
        // }),
        
        new htmlWebpackPlugin({
            outputPath: '../assets/fonts',
            filename : "indexx.html",
            title: "htmlWebpackPlugin test",
            hash: true,
            chunks: ["jquery", "directore"],
            chunksSortMode : "manual",
            template : __dirname + '/app/index.html',
   
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),

    ],

}
