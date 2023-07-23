import { Container } from "./imageButton.style";

const ImageButton = ({ size, children, clickHandler, type = 'button' }) => {
    return (
        <Container size={size} onClick={clickHandler} type={type}>
            { children }
        </Container>
    )
}

export default ImageButton