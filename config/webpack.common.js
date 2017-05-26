const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const publicPath = '/';

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'main': './src/main.ts'
    },

    output: {
        path: path.join(__dirname, '/../dist'),
        filename: "scripts/[name].[hash].js",
        publicPath: publicPath,
        sourceMapFilename: '[name].map'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.scss'],
        modules: [path.join(__dirname, 'src'), 'node_modules']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/\.(spec|e2e)\.ts$/],
                use: [
                    'awesome-typescript-loader?configFileName=config/tsconfig.json',
                    'angular-template-url-loader?basePath=' + path.resolve(__dirname, "../src/")
                ]
            },
            {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
                                importLoaders: 2,
                                sourceMap: true,
                                localIdentName: '[name][hash]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                config: {
                                    path: 'config/postcss.config.js'
                                }
                            }
                        },
                        { loader: 'resolve-url-loader?sourceMap'},
                        { loader: 'sass-loader?sourceMap'},
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico|json)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[name][hash].[ext]',
                    }
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        name: 'fonts/[name][hash].[ext]',
                    }
                }
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [{
                    loader: "html-loader",
                    options: {
                        ignoreCustomFragments: [/\{\{.*?}}/],
                        root: path.resolve(__dirname, "../src/"),
                        attrs: [
                            "img:src",
                            "link:href",
                            "a-background-image-view:wa-image-url",
                            "script:src",
                            "link:href",
                            "md-icon:md-svg-icon",
                            "md-icon:md-svg-src",
                            "wa-card-button:wa-svg-icon-src"
                        ]
                    }
                }]
            },
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'dependency'
        }),

        new ExtractTextPlugin('css/[name][hash].css'),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.ENV = process.env.NODE_ENV = "development")
            }
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ]
};