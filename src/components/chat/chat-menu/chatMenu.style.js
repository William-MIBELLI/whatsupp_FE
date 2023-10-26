import styled from "styled-components";
import { theme } from "../../../utils/theme";

const { color } = theme

export const Container = styled.div`
    background-color: green;
    position: absolute;
    top: 100%;
    right: 0;
`

export const MenuItem = styled.div`
    background-color: ${color.dark_bg_2};
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${color.dark_text_2};
    padding: 0 5px;
    cursor: pointer;

    &:hover{
        background-color: ${color.dark_bg_1};
    }
`