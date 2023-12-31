import styled from "styled-components";
import { ArrowIcon, CallIcon } from "../../../svg";

export const Container = styled.div`
    background-color: ${props => props.theme.bg_3};
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    border-radius: 0 0 5px 5px;
    padding: 0 15px;
    box-sizing: border-box;
    z-index: 40;
    display: flex:
    align-items: center;
    justify-content: center;

    svg{
        fill: ${props => props.theme.svg_1};
    }

`

export const Arrow = styled(ArrowIcon)`
    fill: white;    
`

export const ArrowContainer = styled.div`
    transform: scale(2) rotate(90deg);
    height: auto;
    background-color: red;
`

export const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 100%;
`

export const Call = styled(CallIcon)`
    fill: ${props => props.theme.red_1};
    cursor: pointer;
`
