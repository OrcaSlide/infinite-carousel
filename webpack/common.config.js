/**
 * Configuracion general.
 *
 * @package Brahma.
 * @subPackage Webapck.
 *
 * @uthor Jmendez <jorge.mendez.ortega@gmail.com>
 */
const PATH = require("path");
const EXTRACT_TEXT_PLUGIN = require("extract-text-webpack-plugin");
const ROOT_FOLDER = PATH.resolve(__dirname, "../");
const WEBPACK = require("webpack");
const MANIFEST = require("../src/app/assets/dll/brahma-manifest.json");

const COMMON_CONFIG = {
    entry: {
        main: PATH.resolve(__dirname, "../src/app/src/main.js"),
    },
    output: {
        filename: "[name].js",
        path: `${ROOT_FOLDER}/dist/`,
        publicPath: "/dist/",
        pathinfo: true,
    },
    module: {
        rules: [
            {
                // Rules for JS
                exclude: /(node_modules)/,
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "react",
                            "env",
                            "flow",
                            "stage-0",
                        ],
                        plugins: ["inline-json-import", "react-hot-loader/babel"],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: EXTRACT_TEXT_PLUGIN.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"],
                }),
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 100000,
                        fallback: "file-loader",
                        name: "img/[name].[ext]",
                    },
                },
            },
        ],
    },
    plugins: [
        new EXTRACT_TEXT_PLUGIN({ filename: "[name].css" }),
        new WEBPACK.DllReferencePlugin({
            manifest: MANIFEST, // se importa el manifiesto
        }),
    ],
};

module.exports = COMMON_CONFIG;
