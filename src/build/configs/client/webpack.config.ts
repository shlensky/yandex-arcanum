import WebpackManifestPlugin from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import { DefinePlugin } from 'webpack';
import { resolve } from 'path';
import merge from 'webpack-merge';
import { PUBLIC_PATH, IS_PRODUCTION, defaultConfig } from 'build/configs/common.webpack.config';

export default merge(defaultConfig, {
    name: 'client',
    entry: resolve('src/client/index.ts'),

    output: {
        path: resolve('dist/client/assets'),
        filename: IS_PRODUCTION ? '[name].[contenthash:8].js' : '[name].js',
        chunkFilename: IS_PRODUCTION ? '_[name].[contenthash:8].js' : '_[name].js',
        publicPath: PUBLIC_PATH,
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
                                    cacheDirectory: resolve('node_modules/.cache/babel-client'),
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
                                                modules: false,
                                                loose: true,
                                                useBuiltIns: 'usage',
                                                corejs: 3,
                                            },
                                        ],
                                        ['@babel/preset-react', {}],
                                        ['@babel/preset-typescript', {}],
                                    ],
                                    plugins: [
                                        '@babel/plugin-proposal-class-properties',
                                        '@babel/plugin-transform-runtime',
                                        'babel-plugin-optimize-react',
                                    ],
                                },
                            },
                        ],
                    },

                    {
                        test: /\.scss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'cache-loader',
                                options: {
                                    cacheDirectory: resolve('node_modules/.cache/babel-client'),
                                },
                            },
                            'css-loader',
                            'sass-loader',
                        ],
                    },

                    {
                        test: /\.svg$/,
                        loader: 'file-loader',
                        options: {
                            name: IS_PRODUCTION ? '[name].[contenthash:8].[ext]' : '[name].[ext]',
                            publicPath: PUBLIC_PATH,
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: IS_PRODUCTION ? '[name].[contenthash:8].css' : '[name].css',
            chunkFilename: IS_PRODUCTION ? '_[name].[contenthash:8].css' : '_[name].css',
        }),

        new WebpackManifestPlugin({
            fileName: '../../asset-manifest.json',
            publicPath: PUBLIC_PATH,
            generate(seed, files) {
                let manifestFiles = files.reduce(function(manifest, file) {
                    if (file.name) {
                        // @ts-ignore
                        manifest[file.name] = file.path;
                    }

                    return manifest;
                }, seed);

                return {
                    files: manifestFiles,
                };
            },
        }),

        new DefinePlugin({
            'typeof window': '"object"',
        }),

        ...(IS_PRODUCTION ? [new OptimizeCssAssetsPlugin(), new BundleAnalyzerPlugin.BundleAnalyzerPlugin()] : []),
    ],
});
