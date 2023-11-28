import styled from "styled-components";

export const Container = styled.div`
    background-color: ${props => props.theme.green_1};
    position: absolute;
    top: 20%;
    left: 100%;
    height: 100px;
    width: 50px;
    border-radius: 0 50% 50% 0;
    display: flex;
    justify-content: center;
    align-items: center;

    svg{
    transition: all 0.2s ease-in;
        ${({$hide}) => $hide ? 'transform: scale(2)' : 'transform: scale(2) rotate(180deg)'};
        
    }

    @media only screen and (min-width: 650px){
        display: none;
    }
`