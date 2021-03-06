import * as Webpack from 'webpack';

import { resolve } from 'path';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const PUBLIC_PATH = '/assets/';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const defaultConfig: Webpack.Configuration = {
    mode: IS_PRODUCTION ? 'production' : 'development',
    node: false,
    watch: !IS_PRODUCTION,

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],

        modules: [resolve('src'), resolve('node_modules')],
    },

    plugins: IS_PRODUCTION ? [] : [new ForkTsCheckerWebpackPlugin()],
};

export { PUBLIC_PATH, IS_PRODUCTION, defaultConfig };
