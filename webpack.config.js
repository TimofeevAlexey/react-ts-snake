const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist')
};

const config = {
    mode:"none",
    context: paths.src, // базовая директория для точек входа и загрузчиков
    entry: {
        app: './index'  // точка входа в приложение, наш src/index.tsx файл, названием итогового бандла будет имя свойства - app
    },

    output: {
        path: paths.dist,  // путь для результатов сборки
        filename: '[name].bundle.js'  // название итогового бандла, получится dist/app.bundle.js
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'] // добавляем расширение tsx для файлов с react компонентами
    },

    devtool: 'inline-source-map', // дополнительные настройки и загрузчики не требуются, хотя даже официальный рецепт от TypeScript рекомендует source-map-loader и поле в tsconfig - "sourceMap": true

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }, // загрузчик для обработки файлов с расширением .ts
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            }
        ]

    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './index.html'
        }) // генерация html-файла на основе нашего шаблона
    ],

};

module.exports = config;