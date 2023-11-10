import { Component } from "./primaryText.style";

const PrimaryText = ({ children, clickHandler, className }) => {
    return (
        <Component onClick={clickHandler} className={className}>
            {children}
        </Component>
    )
}

export default PrimaryText