import styled, { keyframes } from "styled-components";
import { ArrowIcon, ConfirmIcon, ReturnIcon } from "../../../svg";

export const Container = styled.div`
    z-index: 50;
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
`

export const Body = styled.div`
    margin-top: 10px;
    padding: 0 5px;
    height: 200px;
`

export const Footer = styled.div`
    display: inline-block;
    width: auto;
`

export const Arrow = styled(ReturnIcon)`
    fill: white;
`
export const ArrowContainer = styled.div`
 cursor: pointer;
`

export const Input = styled.input`
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    padding: 15px;
    color: white;
    margin-left: 10px;
    padding-left: 0;
    border-bottom: 1px solid ${props => props.theme.color.green_2};
`

export const Confirm = styled(ConfirmIcon)`
    height: 50px;
    width: 50px;
    cursor: pointer;

    &:hover{
        transform: scale(1.05);
    }
`

export const Error = styled.p`
    color: ${props => props.theme.color.red_1};
    font-weight: bold;
    font-size: 0.8rem;
`
