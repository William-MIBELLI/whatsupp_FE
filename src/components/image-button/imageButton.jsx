import { Container } from "./imageButton.style";

const ImageButton = ({ size, children, bg, clickHandler, padding, type = 'button' }) => {

    return (
        <Container size={size} onClick={clickHandler} type={type} bg={bg} padding={padding}>
            { children }
        </Container>
    )
}

export default ImageButton