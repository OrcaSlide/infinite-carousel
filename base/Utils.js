class Utils {
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

    static get isMobile() { /* ads */
        const DEVICE = (typeof navigator !== "undefined")
            ? navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)
            : "desktop";
        const WIDTH_SCREEN = (typeof window !== "undefined")
            ? window.innerWidth
            : "1024";
        let request = "desktop";

        if (DEVICE != null) {
            if (WIDTH_SCREEN <= 768) {
                request = "phone";
            } else if (WIDTH_SCREEN > 768 && WIDTH_SCREEN <= 1024) {
                request = "tablet";
            }
        }
        return request;
    }

    static createItem(limit, assets, name, date, alt, id = "card", isActive = false) {
        let item = "";
        for (let i = 1; i <= limit; i += 1) {
            const ID = (i < 10) ? `0${i}` : i;
            const ACTIVE = (isActive && i === 1) ? "-Active" : "";
            item += ITEMS.replace(/{ID}/g, `${id}-${ID}`)
                .replace(/{ACTIVE}/g, ACTIVE)
                .replace(/{ASSETS}/g, `${assets}-${ID}`)
                .replace(/{ALT}/g, `${alt}-${ID}`);
        }
        item = item.replace(/{NAME}/g, name)
            .replace(/{DATE}/g, date);
        return item;
    }
}
