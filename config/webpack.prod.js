const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = Merge(CommonConfig, {
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                htmlLoader: {
                    ignoreCustomFragments: [/\{\{.*?}}/],
                    caseSensitive: true,
                    customAttrSurround: [
                        [/#/, /(?:)/],
                        [/\*/, /(?:)/],
                        [/\[?\(?/, /(?:)/]
                    ],
                    customAttrAssign: [/\)?\]?=/],

                    minify: {
                        minimize: true,
                        removeComments: true,
                        minifyJS: true,
                        minifyCSS: true,
                        collapseWhitespace: true,
                        processConditionalComments: true,

                        removeAttributeQuotes: false,
                        keepClosingSlash: true,
                        conservativeCollapse: true
                    }

                }
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
});
