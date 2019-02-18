import React from "react";
import ReactDOM from "react-dom";
import { Description, Carousel } from "./Components";
import CircularCarousel from "./carousel";
import "./styles/Main.scss";

ReactDOM.hydrate(
    <section className="Wrapper__Content">
        <h1 className="Title">
            Circle Carousels
        </h1>
        <Description titulo="1.- Flow" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit." />
        <Carousel
            index={1}
            items={15}
            child={{
                img: "HBO",
                name: "Alan Mena",
                date: "18 de Enero",
            }}
        />

        <Description titulo="2.- Card by Card" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit." />
        <Carousel
            index={2}
            items={15}
            child={{
                img: "Lego",
                name: "Jorge Méndez",
                date: "12 de Febrero",
            }}
        />

        <Description titulo="3.- ViewBox by ViewBox" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit." />
        <Carousel
            index={3}
            items={15}
            child={{
                img: "HBO",
                name: "Alan Mena",
                date: "18 de Enero",
            }}
        />

        <Description titulo="4.- 3 Thumbs" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit." />
        <Carousel
            index={4}
            items={3}
            child={{
                img: "Lego",
                name: "Jorge Méndez",
                date: "12 de Febrero",
            }}
        />

        <Description titulo="5.- 4 Thumbs" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit." />
        <Carousel
            index={5}
            items={4}
            child={{
                img: "HBO",
                name: "Alan Mena",
                date: "18 de Enero"
            }}
        />

    </section>,
    document.querySelector(".Wrapper"),
);
document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        console.time("CircularCarousel");
        // "1.- Flow"console.time("CircularCarousel");
        CircularCarousel.init = {
            arrowNext: "#Next1",
            arrowPrevious: "#Previous1",
            carouselTrack: "#Track1",
            type: "hswipe",
            pin: {
                disabled: "Carousel__Item",
                enabled: "Carousel__Item-Active",
            },
        };
        // "2.- Card by Card"
        CircularCarousel.init = {
            arrowNext: "#Next2",
            arrowPrevious: "#Previous2",
            carouselTrack: "#Track2",
            type: "card",
            moveItems: 1,
            pin: {
                disabled: "Carousel__Item",
                enabled: "Carousel__Item-Active",
            },
        };
        // "3.- ViewBox by ViewBox"
        CircularCarousel.init = {
            arrowNext: "#Next3",
            arrowPrevious: "#Previous3",
            carouselTrack: "#Track3",
            pin: {
                disabled: "Carousel__Item",
                enabled: "Carousel__Item-Active",
            },
        };
        // "4.- 3 Thumbs"
        CircularCarousel.init = {
            arrowNext: "#Next4",
            arrowPrevious: "#Previous4",
            carouselTrack: "#Track4",
            type: "hswipe",
            pin: {
                disabled: "Carousel__Item",
                enabled: "Carousel__Item-Active",
            },
        };
        // "5.- 4 Thumbs"};
        CircularCarousel.init = {
            arrowNext: "#Next5",
            arrowPrevious: "#Previous5",
            carouselTrack: "#Track5",
            type: "hswipe",
            pin: {
                disabled: "Carousel__Item",
                enabled: "Carousel__Item-Active",
            },
        };
        console.timeEnd("CircularCarousel");
    }
};


