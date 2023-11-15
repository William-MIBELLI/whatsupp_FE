import styled from "styled-components";
import { ReturnIcon } from "../../../svg";

export const Container = styled.div`
    z-index: 50;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
`;

export const Body = styled.div`
    margin-top: 10px;
    padding: 0 5px;
    height: 200px;
`;

export const Footer = styled.div`
    display: inline-block;
    width: auto;
`;

export const Arrow = styled(ReturnIcon)`
    fill: white;
`;
export const ArrowContainer = styled.div`
    cursor: pointer;
`;

export const Input = styled.input`
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    padding: 15px;
    color: ${props => props.theme.text_1};
    margin-left: 10px;
    padding-left: 0;
    border-bottom: 1px solid ${(props) => props.theme.green_2};
`;
