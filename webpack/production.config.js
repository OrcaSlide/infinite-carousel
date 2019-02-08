/**
 * Configuracion webpack production.
 *
 * @package Brahma.
 * @subPackage Webapck.
 *
 * @uthor Jmendez <jorge.mendez.ortega@gmail.com>
*/
const MERGE = require("webpack-merge");
const EXTRACT_TEXT_PLUGIN = require("extract-text-webpack-plugin");
const UGLIFY_JS_PLUGIN = require("uglifyjs-webpack-plugin");
const WEBPACK = require("webpack");

/**
 * Configuracion generica.
 */
const COMMON = require("./common.config.js");

const WEBPACK_DEVELOPMENT = hashBundle => MERGE(
    COMMON,
    {
        mode: "production",
        performance: {
            hints: false,
        },
        optimization: {
            noEmitOnErrors: true,
            mergeDuplicateChunks: false,
            minimizer: [
                new UGLIFY_JS_PLUGIN({
                    sourceMap: false,
                    uglifyOptions: {
                        output: {
                            comments: false,
                            beautify: false,
                        },
                        compress: {
                            booleans: true,
                            collapse_vars: true,
                            comparisons: true,
                            conditionals: true,
                            dead_code: false,
                            drop_console: true,
                            drop_debugger: true,
                            evaluate: true,
                            hoist_funs: true,
                            if_return: true,
                            join_vars: true,
                            keep_fargs: false,
                            loops: true,
                            properties: true,
                            pure_getters: true,
                            sequences: true,
                            unsafe_comps: true,
                            unused: true,
                            warnings: false,
                        },
                    },
                }),
            ],
        },
        plugins: [
            new EXTRACT_TEXT_PLUGIN({ filename: "../css/[name].css" }),
            new WEBPACK.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
            }),
        ],
    },
);

module.exports = WEBPACK_DEVELOPMENT;