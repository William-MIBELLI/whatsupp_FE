import { Component } from "./secondaryText.style";

const SecondaryText = ({ children, className }) => {
    return (
        <Component className={className}>
            {children}
        </Component>
    )
}

export default SecondaryText