import React from "react";

const Title = ({ title, className }) => {
    return (
        <h2 className={`${className} text-2xl font-semibold capitalize`}>
            {title}
        </h2>
    );
};

export default Title;
