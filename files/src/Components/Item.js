import React from "react";
import PropTypes from "prop-types";

const Item = props => (
    <div className="Carousel__Item">
        <a href="#" className={`Items__ItemTypeA${props.active}`}>
            <div className="Items__ItemTypeAThumbnail">
                <div className="Items__ItemTypeAImageContainer">
                    <picture>
                        <source media="(min-width:0px) and (max-width:414px)" srcSet={`./assets/images/${props.img}/${props.img}-Image-${props.index}.jpg`} />
                        <source media="(min-width:415px) and (max-width:768px)" srcSet={`./assets/images/${props.img}/${props.img}-Image-${props.index}.jpg`} />
                        <source media="(min-width:769px)" srcSet={`./assets/images/${props.img}/${props.img}-Image-${props.index}.jpg`} />
                        <img className="Items__ItemTypeAImage" src={`./assets/images/${props.img}/${props.img}-Image-${props.index}.jpg`} alt={props.img} />
                    </picture>
                </div>
                <div className="Items__ItemTypeAVideoContainer">
                    <div className="Items__ItemTypeAVideo">
                    </div>
                </div>
                <div className="Items__ItemTypeAIconContainer">
                    <div className="Items__ItemTypeAIcon">
                        <span className="Display">Display</span>
                    </div>
                </div>
            </div>
            <div className="Items__ItemTypeACaption">
                <div className="Items__ItemTypeATitleContainer">
                    <h3 className="Items__ItemTypeATitle">
                        When you delete something.
                    </h3>
                </div>
                <div className="Items__ItemTypeADescriptionContainer">
                    <p className="Items__ItemTypeADescription">
                        Power belongs to the people that take it. Nothing to do with their hard work, strong ambitions.
                    </p>
                </div>
                <div className="Items__ItemTypeADateContainer">
                    <time className="Items__ItemTypeADate">
                        {props.date}
                    </time>
                </div>
                <div className="Items__ItemTypeAAutorContainer">
                    <span className="Items__ItemTypeAAutor">
                        {props.name}
                    </span>
                </div>
                <div className="Items__ItemTypeALabelContainer">
                    <span className="Items__ItemTypeALabel">
                        Ver Contenido
                    </span>
                </div>
            </div>
        </a>
    </div>
);

Item.propTypes = {
    active: PropTypes.string,
    index: PropTypes.string,
    img: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
};

Item.defaultProps = {
    active: "",
    index: "",
    img: "",
    name: "",
    date: "",
};

export default Item;
