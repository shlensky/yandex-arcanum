import { WebpackClusterPlugin } from 'build/webpack/WebpackClusterPlugin';
import { resolve } from 'path';
import { DefinePlugin } from 'webpack';
import { LAZY_COMPONENT_PLUGIN } from 'build/babel/lazyComponentBabelPlugin';
import merge from 'webpack-merge';
import { PUBLIC_PATH, IS_PRODUCTION, defaultConfig } from 'build/configs/common.webpack.config';

export default merge(defaultConfig, {
    name: 'server',
    entry: resolve('src/server/index.ts'),

    output: {
        path: resolve('dist'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        libraryTarget: 'commonjs2',
    },

    externals: {
        fs: 'commonjs fs',
        os: 'commonjs os',
        util: 'commonjs util',
        path: 'commonjs path',
        react: 'commonjs react',
        express: 'commonjs express',
        'node-fetch': 'commonjs node-fetch',
        // eslint-disable-next-line @typescript-eslint/camelcase
        child_process: 'commonjs child_process',
    },

    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.tsx?$/,
                        include: [resolve('src')],
                        use: [
                            {
                                loader: 'cache-loader',
                                options: {
                                    cacheDirectory: resolve('node_modules/.cache/babel-server'),
                                },
                            },
                            {
                                loader: 'babel-loader',
                                options: {
                                    babelrc: false,

                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                loose: true,
                                                modules: false,
                                                targets: {
                                                    node: true,
                                                },
                                            },
                                        ],
                                        ['@babel/preset-typescript', {}],
                                        ['@babel/preset-react', {}],
                                    ],
                                    plugins: [
                                        LAZY_COMPONENT_PLUGIN,
                                        '@babel/plugin-proposal-class-properties',
                                        '@babel/plugin-transform-runtime',
                                    ],
                                },
                            },
                        ],
                    },

                    {
                        test: /\.scss$/,
                        loader: 'null-loader',
                    },

                    {
                        test: /\.svg$/,
                        loader: 'file-loader',
                        options: {
                            name: IS_PRODUCTION ? '[name].[contenthash:8].[ext]' : '[name].[ext]',
                            publicPath: PUBLIC_PATH,
                            emitFile: false,
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new WebpackClusterPlugin({ filename: 'main.js' }),
        new DefinePlugin({
            'typeof window': '"undefined"',
        }),
    ],
});
