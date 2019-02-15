import React from "react";
import PropTypes from "prop-types";

const Description = props => (
    <section className="Description">
        <h2 className="Description__Title">
            {props.titulo}
        </h2>
        <p className="Description__Paragraph">
            {props.description}
        </p>
    </section>
);
Description.propTypes = {
    titulo: PropTypes.string,
    description: PropTypes.string,
};

Description.defaultProps = {
    titulo: "",
    description: "",
};

export default Description;