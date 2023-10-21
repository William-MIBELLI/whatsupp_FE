import styled from "styled-components";
import { ArrowIcon, CallIcon } from "../../../svg";

export const Container = styled.div`
    background-color: ${props => props.theme.color.dark_bg_3};
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    border-radius: 0 0 5px 5px;
    padding: 0 15px;
    box-sizing: border-box;
    z-index: 40;

    svg{
        fill: white;
    }
`

export const Arrow = styled(ArrowIcon)`
    fill: white;    
`

export const ArrowContainer = styled.div`
    transform: scale(2) rotate(90deg);
`

export const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const Call = styled(CallIcon)`
    fill: ${props => props.theme.color.red_1};
`