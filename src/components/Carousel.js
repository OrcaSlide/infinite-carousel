import React, { Component } from "react";
import PropTypes from "prop-types";
import Item from "./Item";
import Logic from "../Logic";

class Carousel extends Component {
    componentDidMount() {
        const { idGral } = this.props;
        Logic.init = {
            arrowNext: `#Next-${idGral}`,
            arrowPrevious: `#Previous-${idGral}`,
            carouselTrack: `#Track-${idGral}`,
            pin: {
                disabled: "Carousel__Item",
                enabled: "Carousel__Item-Active",
            },
        };
    }

    createItem() {
        const { items, idGral, name, date, isActive, assets } = this.props;
        const ITEMS = [];
        for (let i = 1; i <= items; i += 1) {
            const ID = (i < 10) ? `0${i}` : i;
            const ACTIVE = (isActive && i === 1) ? "-Active" : "";
            ITEMS.push(
                <Item
                    id={`Item-${idGral}-${ID}`}
                    key={`Item-${idGral}-${ID}`}
                    assets={`${assets}-${ID}.jpg`}
                    alt={`Card-${i}`}
                    name={name}
                    date={date}
                    isActive={ACTIVE}
                />
            )
        }
        return ITEMS;
    }
    
    render() {
        const { idGral } = this.props;
        return (
            <div className="Carousel">
                <div className="Carousel__Arrow">
                    <button className="Carousel__Arrow-Previous" id={`Previous-${idGral}`}>
                        <span className="Display">
                            This is the Previous Button Container
                        </span>
                    </button>
                </div>

                <div className="Carousel__ViewBox">
                    <div className="Carousel__Track" id={`Track-${idGral}`}>
                        {this.createItem()}
                    </div>
                </div>

                <div className="Carousel__Arrow">
                    <button className="Carousel__Arrow-Next" id={`Next-${idGral}`}>
                        <span className="Display">
                            This is the Next Button Container
                        </span>
                    </button>
                </div>

            </div>

        );
    }
}


Carousel.propTypes = {
    assets: PropTypes.string,
    items: PropTypes.number,
    idGral: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    isActive: PropTypes.bool,
};

Carousel.defaultProps = {
    assets: "assets",
    items: 0,
    idGral: "dummy",
    name: "Dummy",
    date: "31 de Diciembre",
    isActive: false,
};

export default Carousel;
