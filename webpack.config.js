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
        // filename : '[name].[contenthash].js', 
        filename : '[name].js', 
        path : path.resolve(__dirname , 'dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },        
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
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				generator: {
					filename: './fonts/[hash][ext]',
				},
			},

        ],

    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        // new htmlWebpackPlugin({
        //     filename : "index2.html",
        //     hash: true,
        //     chunks: ["jquery", "directore"],
        //     chunksSortMode : "manual",
        //     templateContent: `

        //     <!DOCTYPE html>
        //     <html lang="fa">
        //     <head>
        //         <meta charset="UTF-8">
        //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
        //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //         <!-- JQ -->
        //         <title> htmlWebpackPlugin test </title>
        //     </head>


        //     <body class="container" id="elimg">

        //         <p> به نام خدا </p>


                
        //         <button class="btn btn-danger"> test <i class="bi bi-telegram"></i> </button>

        //     </body>
        //     </html>


        //     `
        // }),

        new MiniCssExtractPlugin({
            // filename: '[name].[contenthash].css'
            filename: '[name].css'
        }),

    ],

}
