const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
let path = require('path');

module.exports = function(env) {
    return Merge(CommonConfig, {
        devtool: 'source-map',

        output: {
            path: path.join(__dirname, '/../dist'),
            filename: '[name].bundle.js',
            publicPath: CommonConfig.output.publicPath,
            sourceMapFilename: '[name].map'
        },

        devServer: {
            port: 9000,
            host: 'localhost',
            noInfo: false,
            hot: true,
            stats: 'minimal',
            publicPath: CommonConfig.output.publicPath,
            historyApiFallback: {
                rewrites: [
                    { from: /^\/$/, to: '/views/landing.html' },
                    { from: /^\/subpage/, to: '/views/subpage.html' },
                    { from: /./, to: '/views/404.html' }
                ]
            },
            overlay: {
                warnings: true,
                errors: true
            },
            proxy: {
                "/api": {
                    target: "http://localhost:3000",
                    pathRewrite: {"^/api" : ""}
                }
            }
        }
    });
};