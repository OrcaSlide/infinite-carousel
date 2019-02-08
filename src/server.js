
import Express from "express";
import Path from "path";
import webpack from "webpack";
import browserSync from "browser-sync";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

import { Config, Router } from "./app/config/index";
import webpackConfig from "../webpack/development.config";

const {
    port, domain,
    assets, views,
} = Config;

const APP = Express();
const ASSETS = Path.join(__dirname, assets);
const VIEWS = Path.join(__dirname, views);
const COMPILER = webpack(webpackConfig());
const ROOT_FOLDER = Path.resolve(__dirname, "./");
console.log(ROOT_FOLDER);
/**
 * Transpilacion dinamica de webpack.
 */
APP.use(webpackDevMiddleware(COMPILER, {
    publicPath: "/dist/",
    stats: { colors: true },
    serverSideRender: true,
}));

APP.use(webpackHotMiddleware(COMPILER, {
    log: console.log,
}));

/**
 * Rutas establecidas
 */
APP.use(Router(ASSETS, VIEWS));

/**
 * Puerto en el que el servidor se levanta.
 */
APP.listen(port, domain, (error) => {
    console.log("Iniciando el servidor :)");
    if (error) {
        process.exit(1);
    } else {
        browserSync({
            files: [
                `${ROOT_FOLDER}/app/**/*.{js,scss,html}`,
            ],
            online: true,
            open: false,
            port: port + 1,
            proxy: 'localhost:' + port,
            ui: false
        });
        console.log("Servidor listo");
    }
});
