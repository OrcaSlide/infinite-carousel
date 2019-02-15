import CircularCarousel from "./Carousel";

class Carousel {
    static set init(config) {
        const CONFIG = JSON.stringify(config);
        const NEW_CONFIG = JSON.parse(CONFIG);
        return new CircularCarousel(NEW_CONFIG);
    }
}

export default Carousel;
