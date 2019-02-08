import Express from "express";

const AsuraRouter = (assets, views) => {
    const ROUTER = Express();

    ROUTER.use("/assets", Express.static(assets));
    ROUTER.use("/", (request, response) => {
        let htmlTemplate = request.originalUrl;
        htmlTemplate = htmlTemplate === "/" ? "index" : htmlTemplate;
        response.status(200);
        response.sendFile(`${views}${htmlTemplate}.html`);
    });

    return ROUTER;
};

export default AsuraRouter;
