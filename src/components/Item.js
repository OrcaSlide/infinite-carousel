import React from "react";
import PropTypes from "prop-types";
import Image from "../components/image"

const Item = (props) => {
    const {
        id, assets,
        alt, name,
        date, isActive,
    } = props;
    return (
        <div className={`Carousel__Item${isActive}`} id={id}>
            <a href="#" className="Items__ItemTypeA">
                <div className="Items__ItemTypeAThumbnail">
                    <div className="Items__ItemTypeAImageContainer">
                        <picture>
                            <source media="(min-width:0px) and (max-width:414px)" srcSet={assets} />
                            <source media="(min-width:415px) and (max-width:768px)" srcSet={assets} />
                            <source media="(min-width:769px)" srcSet={assets} />
                            <img className="Items__ItemTypeAImage" src={assets} alt={alt} />
                        </picture>
                    </div>
                    <div className="Items__ItemTypeAVideoContainer">
                        <div className="Items__ItemTypeAVideo" />
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
                            When you delete something, you’re making a choice to destroy it.
                            To never see it again.
                        </h3>
                    </div>
                    <div className="Items__ItemTypeADescriptionContainer">
                        <p className="Items__ItemTypeADescription">
                            Power belongs to the people that take it. Nothing to do with
                            their hard work, strong ambitions, or rightful qualifications, no.
                            The actual will to take is often the only thing that’s necessary.
                        </p>
                    </div>
                    <div className="Items__ItemTypeADateContainer">
                        <time className="Items__ItemTypeADate">
                            {date}
                        </time>
                    </div>
                    <div className="Items__ItemTypeAAutorContainer">
                        <span className="Items__ItemTypeAAutor">
                            {name}
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
};

Item.propTypes = {
    id: PropTypes.string,
    assets: PropTypes.string,
    alt: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    isActive: PropTypes.string,
};

Item.defaultProps = {
    id: "",
    assets: "",
    alt: "",
    name: "Dummy",
    date: "31 de Diciembre",
    isActive: "",
};

export default Item;
