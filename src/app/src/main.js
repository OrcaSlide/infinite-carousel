import React from "react";
import ReactDOM from "react-dom";
import Carousel from "./components/Carousel/Carousel";
import "./stylesheets/Main.scss";

ReactDOM.hydrate(
    <Carousel />,
    document.getElementById("app"),
);
