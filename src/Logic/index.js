import CircularCarousel from "./Carousel";

class Auxiliar {
    static set init(config) {
        const CONFIG = JSON.stringify(config);
        const NEW_CONFIG = JSON.parse(CONFIG);
        const TEST = new CircularCarousel(NEW_CONFIG);
    }
}

export default Auxiliar;