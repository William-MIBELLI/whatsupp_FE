import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    from {
        transform: rotate(90deg);
    }
`

export const Component = styled.div`
    height: 49px;
    padding: 6px 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & svg {
        fill: ${(props) => props.theme.color.dark_svg_1};
        cursor: pointer;
    }
`;

export const Container = styled.div`
    padding: 0 10px;
    width: 90%;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.color.dark_bg_2};
    border-radius: 10px;
    height: 2rem;
`;

export const Input = styled.input`
    width: 100%;
    margin-left: 10px;
    background-color: ${(props) => props.theme.color.dark_bg_2};
    border: none;
    outline: none;
    color: ${(props) => props.theme.color.dark_text_1};

    &::placeholder {
        color: ${props => props.theme.color.dark_text_3};
    }
`;
export const ReturnContainer = styled.div`
    display: flex;
    animation: ${rotate} 0.3s forwards;
    align-items: center;
    & svg {
        fill: ${(props) => props.theme.color.green_1};
    }
`;
