/* eslint-disable */

import React, { Component } from "react";
import PropTypes from "prop-types";

import Item from "./Item";

class Carousel extends Component {

    get drawChildrens() {
        const { items, child, index: KEY } = this.props;
        let children = [];
        for (let index = 1; index <= items; index++) {
            const INDEX = (index < 10) ? `0${index}` : `${index}`;
            const ACTIVE = (index === 1) ? "-Active" : "";
            children.push(<Item key={`CR-${KEY}-${INDEX}`} {...child} index={INDEX} active={ACTIVE} />);
        }
        return children;
    }
    render() {
        const props = this.props;
        return (
            <div className="Carousel">
                <div className="Carousel__Arrow">
                    <button className="Carousel__Arrow-Previous" id={`Previous${props.index}`}>
                        <span className="Display">
                            This is the Previous Button Container
                        </span>
                    </button>
                </div>

                <div className={`Carousel__ViewBox${props.modificar}`}>
                    <div className="Carousel__Track" id={`Track${props.index}`}>
                        {this.drawChildrens}
                    </div>
                </div>

                <div className="Carousel__Arrow">
                    <button className="Carousel__Arrow-Next" id={`Next${props.index}`}>
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
    modificar: PropTypes.string,
    index: PropTypes.number,
    items: PropTypes.number,
    child: PropTypes.shape({}),
};

Carousel.defaultProps = {
    modificar: "",
    index: 0,
    items: 1,
    child: {},
};

export default Carousel;
