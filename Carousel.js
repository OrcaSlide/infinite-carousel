const DEFAULT = {
    arrowNext: "ArrowNext",
    arrowPrevious: "ArrowPrevious",
    carouselTrack: "CarouselTrack",
    moveItems: 1,
    time: 500,
};

/**
 * Logic for CircularCarousel.
 *
 * @category UI Carousel.
 * @package Carousel.
 * @author Televisa Digital.
 * @author Jorge Mendez Ortega <jorge.mendez@televisatim.com>
*/
class CircularCarousel {
    /**
     * Begin build Config.
     *
     * @param {object} config Initial config for Carousel.
     */
    constructor(config) {
        this.config = { success: false };
        this.config = Object.assign(DEFAULT, config);
        const {
            arrowNext, arrowPrevious, carouselTrack,
        } = this.config;

        this.getElementDom(arrowNext, "arrowNext");
        this.getElementDom(arrowPrevious, "arrowPrevious");
        const $CONTAINER = this.getElementDom(carouselTrack, "carouselTrack");

        if ($CONTAINER) {
            const CHILDREN = $CONTAINER.children;
            const ITEMS = CHILDREN.length;
            const ITEM_SIZE = CHILDREN[0].offsetWidth;
            const TRACK_SIZE = $CONTAINER.offsetWidth;
            const IS_ACTIVE = (ITEM_SIZE * ITEMS) > TRACK_SIZE;
            if (IS_ACTIVE) {
                this.config.items = ITEMS;
                this.config.itemSize = ITEM_SIZE;
                this.config.trackSize = TRACK_SIZE;
                this.config.success = IS_ACTIVE;
                this.buildCircleCarousel();
            } else {
                const {
                    arrowNext: NEXT,
                    arrowPrevious: PREVIOUS,
                } = this.config;
                NEXT.style.display = "none";
                PREVIOUS.style.display = "none";
            }
        }
    }

    actionArrow(isNext = false) {
        const { itemSize, moveItems, pixels } = this.config;
        const MOVE_TO = (itemSize * moveItems);
        const PIXELS = (isNext) ? (pixels + MOVE_TO) : (pixels - MOVE_TO);
        this.config.pixels = PIXELS;
        this.translateCarousel(true);
    }

    /**
     * Build the config for CircularCarousel.
     *
     * @return {void}
     */
    buildCircleCarousel() {
        const {
            arrowNext, arrowPrevious,
            itemSize, trackSize, items,
        } = this.config;
        const CLONE = Math.floor(trackSize / itemSize);
        const IS_CLONE = this.cloneItem(CLONE);
        if (IS_CLONE) {
            const PIXELS = itemSize * CLONE;
            this.config.startPoint = PIXELS;
            this.config.endPoint = (items * itemSize) + PIXELS;
            this.config.pixels = itemSize * CLONE;
            this.translateCarousel();
            arrowNext.addEventListener("click", () => this.actionArrow(true));
            arrowPrevious.addEventListener("click", () => this.actionArrow());
        }
    }

    /**
     * Initial clone items for carousel.
     *
     * @param  {Integer} limit Number of items for clone.
     * @return {Boolean}.
     */
    cloneItem(limit) {
        let response = false;
        try {
            const { carouselTrack: $CONTAINER } = this.config;
            const CHILDREN = [...$CONTAINER.children];
            const ITEMS = Object.entries({
                bottom: CHILDREN.slice(0, limit),
                top: CHILDREN.slice(-limit),
            });

            ITEMS.forEach((item) => {
                const KEY = item[0];
                const CLONE = (KEY === "bottom") ? item[1] : item[1].reverse();
                CLONE.forEach((element) => {
                    const DOM = element.cloneNode(true);
                    if (KEY === "bottom") $CONTAINER.appendChild(DOM);
                    else $CONTAINER.insertBefore(DOM, $CONTAINER.firstChild);
                });
            });
            response = true;
        } catch (Error) {
            /* eslint-disable */
            console.groupCollapsed("%c 🚫 [CircularCarousel => Error cloning components]", "color:#ff3333;");
            console.error(Error);
            console.groupEnd();
            /* eslint-enable */
        }
        return response;
    }

    /**
     * Get an element of the DOM.
     *
     * @param  {stting} selector (Option) querySelector.
     * @return {Object}
     */
    getElementDom(selector = "", key) {
        let element = null;
        const DOCUMENT = document || null;
        if (DOCUMENT && selector) {
            element = document.querySelector(selector);
            this.config[key] = element;
        }
        return element;
    }

    translateCarousel(live = false) {
        const {
            carouselTrack: $CONTAINER,
            pixels, endPoint, startPoint, time,
        } = this.config;
        const TRANSFORM = `transform: translate3d(-${pixels}px, 0px, 0px);`;
        const TRANSITION = `transition:transform ${time}ms ease 0s`;
        const STYLE = TRANSFORM + ((live) ? TRANSITION : "");
        $CONTAINER.setAttribute("style", STYLE);
        if (endPoint === pixels || pixels === 0) {
            this.config.pixels = (pixels === 0) ? (endPoint - startPoint) : startPoint;
            setTimeout(() => this.translateCarousel(), time);
        }
    }
}
