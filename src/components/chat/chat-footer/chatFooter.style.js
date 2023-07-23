import styled from "styled-components";

export const Component = styled.div`
    height: 60px;
    width: 100%;
    position: relative;
    background-color: ${(props) => props.theme.color.dark_bg_3};
    display: flex;
    align-items: center;

    svg {
        fill: ${(props) => props.theme.color.dark_svg_2};
    }
`;

export const Container = styled.form`
    width: 100%;
    padding: 0 16px;
    display: flex;
    align-items: center;
`;

export const Input = styled.input`
    width: 100%;
    outline: none;
    border: none;
    height: 30px;
    margin: 0 10px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.color.dark_bg_4};
    padding-left: 16px;
    color: ${(props) => props.theme.color.dark_text_1};

    &::placeholder {
        color: ${(props) => props.theme.color.dark_text_3};
    }
`;

export const EmojiPickContainer = styled.div`
    position: absolute;
    bottom: 60px;
    width: 100%;
`