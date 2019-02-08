import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./components/welcome";
import "./stylesheets/Main.scss";

ReactDOM.hydrate(
    <Welcome />,
    document.getElementById("app"),
);
