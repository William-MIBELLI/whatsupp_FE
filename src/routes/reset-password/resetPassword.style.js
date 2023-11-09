import styled from "styled-components";
import { theme } from "../../utils/theme";

const { color } = theme

export const Component = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: ${color.dark_bg_1};
    display: flex;
    justify-content: center;
    align-items: center;
`