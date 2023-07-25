import styled from 'styled-components'

export const Container = styled.button`
    width: ${({ size }) => !size ? '40px' : size};
    height: ${({ size }) => !size ? '40px' : size};
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    background: ${({ bg }) => bg ? bg : 'transparent'};
    padding: ${({ padding }) => padding ? '2px' : padding};
    margin: 0.5rem;

    &:active{
        background-color: ${props => props.theme.color.dark_hover_1};
    }

    img, svg{
        width: 100%;
        height: 100%;
    }


`