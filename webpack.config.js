const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    'react',
    'react-dom'
];

module.exports = {

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        open: true,
        port: 3000
    },

    devtool: 'inline-source-map',

    entry: {
        main: './src/index.tsx',
        vendor: VENDOR_LIBS
    },

    mode: 'development',

    module: {
        rules: [

            // Babel loader
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/,
            },

            // Typescript loader
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ],
                exclude: /node_modules/,
            },

            // Style and css loader
            {
                test: /\.(css|scss)$/,
                use: [
                    // Create 'style' nodes from JS strings
                    'style-loader',
                    //Translates CSS to CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            },

            // File loader
            {
                test: /\.(jpg|jpeg|gif|pbg|svg|woff|woff2|eot|ttf|otf|wav|mp3|ico)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ],
    },

    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },

    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
};