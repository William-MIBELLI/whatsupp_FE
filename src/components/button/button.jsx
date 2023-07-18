import { BaseButton } from "./button.style";

const Button = ({ text, type, loading, clickHandler, className }) => {
    return (
        <BaseButton type={type} onClick={clickHandler} className={className} >
            { loading ? 'Loading...' : text }
        </BaseButton>
    )
}

export default Button