import Utils from "./Utils";
import { carousel } from "./config.json";

/**
 * Logic for CircularCarousel.
 *
 * @category UI Carousel.
 * @package Carousel.
 * @author Jorge Mendez Ortega <jorge.mendez.ortega@gmail.com>
*/
class CircularCarousel {
    /**
     * Begin build Config.
     *
     * @param {object} config Initial config for Carousel.
     */
    constructor(config) {
        Object.assign(carousel, config);
        this.config = { ...carousel };
        const {
            arrowNext, arrowPrevious,
            carouselTrack,
        } = this.config;

        this.getElementDom(arrowNext, "arrowNext");
        this.getElementDom(arrowPrevious, "arrowPrevious");
        const $CONTAINER = this.getElementDom(carouselTrack, "viewBox");
        if ($CONTAINER) {
            const CHILDREN = $CONTAINER.children;
            const ITEMS = CHILDREN.length;
            const FIRS_CHILD = CHILDREN[0];
            const GET_STYLES = window.getComputedStyle(FIRS_CHILD);
            const MARGIN_RIGHT = parseInt(GET_STYLES.marginRight, 10);
            const ITEM_SIZE = FIRS_CHILD.offsetWidth + parseInt(MARGIN_RIGHT, 10);
            const VISUAL_BOX_SIZE = $CONTAINER.offsetWidth;
            const IS_ACTIVE = (ITEM_SIZE * ITEMS) > VISUAL_BOX_SIZE;
            if (IS_ACTIVE) {
                this.config.items = ITEMS;
                this.config.itemSize = ITEM_SIZE;
                this.config.viewBoxSize = VISUAL_BOX_SIZE;
                this.config.success = IS_ACTIVE;
                this.config.scroll = MARGIN_RIGHT + VISUAL_BOX_SIZE;
                this.buildCarousel();
            } else {
                $CONTAINER.dataset.active = 0;
                this.hiddenArrow();
                this.activeItem();
            }
        }
    }

    /**
     * Shows the item that is active.
     *
     * @return {void}
     */
    activeItem() {
        const { viewBox: $CONTAINER, pin } = this.config;
        if (pin !== null) {
            const ITEMS = [...$CONTAINER.children];
            ITEMS.forEach((item, index) => {
                item.addEventListener("click", () => {
                    const { enabled, disabled } = pin;
                    const ITEM_ACTIVE = $CONTAINER.dataset.active;
                    const OLD_ITEM = ITEMS[ITEM_ACTIVE];
                    const NEW_ITEM = ITEMS[index];
                    const INDEX_OLD_ITEM = Utils.existFields(OLD_ITEM, "dataset.clone", null);
                    const INDEX_NEW_ITEM = Utils.existFields(NEW_ITEM, "dataset.clone", null);
                    const CLONE_NEW_ITEM = ITEMS[INDEX_NEW_ITEM] || null;
                    const CLONE_OLD_ITEM = ITEMS[INDEX_OLD_ITEM] || null;

                    OLD_ITEM.classList.remove(enabled);
                    OLD_ITEM.classList.add(disabled);
                    if (CLONE_OLD_ITEM) {
                        CLONE_OLD_ITEM.classList.remove(enabled);
                        CLONE_OLD_ITEM.classList.add(disabled);
                    }

                    NEW_ITEM.classList.add(enabled);
                    NEW_ITEM.classList.remove(disabled);
                    if (CLONE_NEW_ITEM) {
                        CLONE_NEW_ITEM.classList.add(enabled);
                        CLONE_NEW_ITEM.classList.remove(disabled);
                    }
                    $CONTAINER.dataset.active = index;
                });
            });
        }
    }

    /**
     * Enabled action for arrows.
     *
     * @param  {Boolean} isNext (Optional)Indicate the type of action for the arrow.
     * @return {void}
     */
    actionArrow(isNext = false) {
        if (this.config.isActive) {
            const {
                itemSize, moveItems,
                pixels, endPoint,
            } = this.config;
            const MOVE_TO = (itemSize * moveItems);
            const PIXELS = (isNext) ? (pixels + MOVE_TO) : (pixels - MOVE_TO);
            let movePixels = PIXELS;
            if (PIXELS > endPoint) {
                movePixels = endPoint;
            } else if (PIXELS < 0) {
                movePixels = 0;
            }
            this.config.pixels = movePixels;
            this.config.isActive = false;
            this.translateCarousel(true);
        }
    }

    /**
     * Build the config for CircularCarousel.
     *
     * @return {void}
     */
    buildCarousel() {
        const {
            arrowNext, arrowPrevious, itemSize,
            viewBoxSize, items, moveItems, scroll,
        } = this.config;
        const CLONE = Math.floor(viewBoxSize / itemSize);
        const IS_CLONE = this.cloneItem(CLONE);
        if (IS_CLONE) {
            const PIXELS = itemSize * CLONE;
            const END_POINT = (items * itemSize) + PIXELS;
            this.config.startPoint = PIXELS;
            this.config.endPoint = (items * itemSize) + PIXELS;
            this.config.scroll = (END_POINT - scroll) + itemSize;
            this.config.pixels = itemSize * CLONE;
            this.config.moveItems = (moveItems === 0 || moveItems > CLONE) ? CLONE : moveItems;
            this.config.isActive = true;
            this.translateCarousel();
            arrowNext.addEventListener("click", () => this.actionArrow(true));
            arrowPrevious.addEventListener("click", () => this.actionArrow());
            this.activeItem();
            this.buildSwipeCarousel();
        }
    }

    /**
     * Enabled swipe in the carousel`s.
     *
     * @return {void}.
     */
    buildSwipeCarousel() {
        const DEVICE = Utils.device;
        if (DEVICE !== "desktop") {
            const {
                pixels, scroll,
                type, viewBox,
            } = this.config;
            const $TRACK = viewBox.parentNode || null;
            switch (type) {
            case "flow":
                $TRACK.addEventListener("scroll", () => {
                    const SCROLL = $TRACK.scrollLeft;
                    if (SCROLL >= scroll) {
                        $TRACK.style.WebkitOverflowScrolling = "auto";
                        $TRACK.scrollLeft = pixels;
                        $TRACK.style.WebkitOverflowScrolling = "touch";
                    } else if (SCROLL <= 0) {
                        $TRACK.style.WebkitOverflowScrolling = "auto";
                        $TRACK.scrollLeft = scroll - pixels;
                        $TRACK.style.WebkitOverflowScrolling = "touch";
                    }
                });
                break;
            case "card":
            default:
                console.log(this.config);
                Utils.touchAction = {
                    callback: (direction) => {
                        const DIRECTIONS = ["left", "right"];
                        if (DIRECTIONS.includes(direction)) {
                            const IS_LEFT = (direction === "left");
                            this.actionArrow(IS_LEFT);
                        }
                    },
                    track: $TRACK,
                };
            }
        } else {
            this.hiddenArrow(true);
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
            const { viewBox: $CONTAINER, items } = this.config;
            const CHILDREN = [...$CONTAINER.children];
            const ITEMS = Object.entries({
                bottom: CHILDREN.slice(0, limit),
                top: CHILDREN.slice(-limit),
            });

            ITEMS.forEach((item) => {
                const KEY = item[0];
                const CLONE = (KEY === "bottom") ? item[1] : item[1].reverse();
                CLONE.forEach((element, index) => {
                    const DOM = element.cloneNode(true);
                    let indexClone = index;
                    if (KEY === "bottom") {
                        indexClone = (items + index) + limit;
                        $CONTAINER.appendChild(DOM);
                    } else $CONTAINER.insertBefore(DOM, $CONTAINER.firstChild);
                    /* eslint-disable */
                    element.dataset.clone = indexClone;
                    /* eslint-enable */
                });
            });
            $CONTAINER.dataset.active = limit;
            response = true;
        } catch (error) {
            Utils.errorMessage = {
                msg: "[CircularCarousel => Error cloning components]",
                error,
            };
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

    /**
     * Arrow hidden when the carousel is not valid
     * or displayed on a smart phone.
     *
     * @return {Void}
     */
    hiddenArrow(show = false) {
        const {
            arrowNext: NEXT,
            arrowPrevious: PREVIOUS,
            display,
        } = this.config;
        const DISPLAY = (!show) ? "none" : display;
        NEXT.parentNode.style.display = DISPLAY;
        PREVIOUS.parentNode.style.display = DISPLAY;
    }

    /**
     * Create anitamiton for the carousel.
     *
     * @param  {Boolean} (Optional)Enable animation for the carousel.
     * @return {void}
     */
    translateCarousel(live = false) {
        const {
            viewBox: $CONTAINER,
            pixels, endPoint, startPoint,
            time, type,
        } = this.config;
        const DEVICE = Utils.device;
        if (DEVICE === "desktop" || type === "card") {
            const TRANSFORM = `transform: translate3d(-${pixels}px, 0px, 0px);`;
            const TRANSITION = `transition:transform ${time}ms ease 0s`;
            const STYLE = TRANSFORM + ((live) ? TRANSITION : "");
            $CONTAINER.setAttribute("style", STYLE);
            setTimeout(() => {
                if (endPoint === pixels || pixels === 0) {
                    this.config.pixels = (pixels === 0) ? (endPoint - startPoint) : startPoint;
                    this.translateCarousel();
                }
                this.config.isActive = true;
            }, time);
        } else {
            const TRACK = $CONTAINER.parentNode || null;
            TRACK.scrollLeft = pixels;
        }
    }
}

export default CircularCarousel;
