import { touch } from "./config.json";

/**
 * Utilities for Circle Carousel.
 *
 * @category Circle Carousel.
 * @package Carousel.
 * @author Jorge Mendez Ortega <jorge.mendez.ortega@gmail.com>
*/
class Utils {
    /**
     * Allows validation of the existence of a field within an array or object.
     *
     * @param  {Object} data Object or arrelglo where the search will be made.
     * @param  {String} keys Lista of search.
     * @param  {any} [requestDefault=""] Value for default.
     * @return {any}
     */
    static existFields(data, keys, requestDefault = "") {
        const KEYS = keys.split(".");
        let objectTest = data;
        const VALIDATE = () => (
            KEYS.every((key) => {
                const REQUEST = (typeof objectTest[key] !== "undefined");
                objectTest = objectTest[key];
                return REQUEST;
            })
        );
        return VALIDATE() ? objectTest : requestDefault;
    }

    /**
     * Detects the direction of the swipe.
     *
     * @param  {Object} swipe  Detects the direction of the swipe.
     * @return {String}
     */
    static directionSwipe(swipe) {
        const HZR_X1 = ((swipe.endX - swipe.min_x) > swipe.startX);
        const HZR_X2 = ((swipe.endX + swipe.min_x) < swipe.startX);
        const HZR_Y1 = (swipe.endY < (swipe.startY + swipe.max_y));
        const HZR_Y2 = (swipe.startY > (swipe.endY - swipe.max_y));

        const VERT_Y1 = ((swipe.endY - swipe.min_y) > swipe.startY);
        const VERT_Y2 = ((swipe.endY + swipe.min_y) < swipe.startY);
        const VERT_X1 = (swipe.endX < (swipe.startX + swipe.max_x));
        const VERT_X2 = (swipe.startX > (swipe.endX - swipe.max_x));

        const IS_HORIZONTAL = ((HZR_X1 || HZR_X2) && (HZR_Y1 && HZR_Y2));
        const IS_VERTICAL = ((VERT_Y1 || VERT_Y2) && (VERT_X1 && VERT_X2));

        let direction = "";

        if (IS_HORIZONTAL) {
            direction = (swipe.endX > swipe.startX) ? "right" : "left";
        } else if (IS_VERTICAL) {
            direction = (swipe.endY > swipe.startY) ? "bottom" : "top";
        }
        return direction;
    }

    /* =================================================== */
    /*                     METODOS GET                     */
    /* =================================================== */

    /**
     * Detects the device from where the site is viewed.
     *
     * @type {String}
     */
    static get device() {
        const DEVICE = (typeof navigator !== "undefined")
            ? navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)
            : "desktop";
        const WIDTH_SCREEN = (typeof window !== "undefined")
            ? window.innerWidth
            : "1024";
        let request = "desktop";

        if (DEVICE) {
            if (WIDTH_SCREEN <= 768) request = "phone";
            else if (WIDTH_SCREEN > 768 && WIDTH_SCREEN <= 1024) request = "tablet";
        }
        return request;
    }

    /**
     * Get list of CSS.
     *
     * @param  {DOM} domElement Reference to object dom.
     * @return {function}
     */
    static getListCSS(domElement) {
        const CSS_LIST = this.existFields(document, "defaultView.getComputedStyle", null);
        const RESPONSE = (domElement && CSS_LIST) ? CSS_LIST(domElement) : null;
        return RESPONSE;
    }

    /**
     * get the operating system of the device
     *
     * @type {String}
     */
    static get deviceBrand() {
        let agent = navigator.userAgent || "unknown";
        agent = agent.toLowerCase();
        agent = agent.match(/android/g) ? "android" : agent;
        agent = agent.match(/ipod|iphone|ipad/g) ? "ios" : agent;
        return agent;
    }

    /* =================================================== */
    /*                     METODOS SET                     */
    /* =================================================== */

    /**
     * Show error message.
     *
     * @return {void}
     */
    static set errorMessage(config) {
        const { error, msg } = config;
        /* eslint-disable */
        console.groupCollapsed(`%c 🚫 ${msg}`, "color:#ff3333;");
        console.error(error);
        console.groupEnd();
        /* eslint-enable */
    }

    /**
     * Create the touch events.
     *
     * @return void.
     */
    static set touchAction(config) {
        const {
            callback: $_CALLBACK,
            swipe,
            track: $TRACK,
        } = Object.assign(touch, config);

        try {
            $TRACK.addEventListener("touchstart", (action) => {
                const TOUCH = this.existFields(action, "touches.0", null);
                if (TOUCH) {
                    swipe.startX = TOUCH.screenX;
                    swipe.startY = TOUCH.screenY;
                }
            }, false);

            $TRACK.addEventListener("touchmove", (action) => {
                const TOUCH = this.existFields(action, "touches.0", null);
                if (TOUCH) {
                    swipe.endX = TOUCH.screenX;
                    swipe.endY = TOUCH.screenY;
                    swipe.direction = this.directionSwipe(swipe);
                }
            }, false);

            $TRACK.addEventListener("touchend", () => {
                if (swipe.direction !== "") {
                    $_CALLBACK(swipe.direction);
                    swipe.direction = "";
                }
            }, false);
        } catch (error) {
            this.errorMessage = {
                msg: "[CircularCarousel => Error implement the touch events]",
                error,
            };
        }
    }
}

export default Utils;
