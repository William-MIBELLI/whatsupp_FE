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
    position: relative;

    &:hover{
        background-color: ${color.dark_bg_1};
    }
`

export const RemoveList = styled.div`
    background-color: green;
    position: absolute;
    right: 100%;
    top: 0;
`

export const RemoveItem = styled(MenuItem)`
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;

    &:hover{
        background-color: ${color.red_1};
        color: ${color.dark_text_1};
    }
`

export const Mini = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
`