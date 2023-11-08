const path = require('path');
const webpack = require('webpack');
const NodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: './src/server.ts',
    target: 'node',
    externals: [NodeExternals()],
    output: {
        filename: 'server.cjs',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
        {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
            },
            },
        },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
};
