import styled from 'styled-components'

export const Component = styled.div`
    height: 50px;
    background-color: ${props => props.theme.color.dark_bg_2};
    display: flex;
    align-items: center;
    padding: 0 16px;

`

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const HomeButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0;
    border: none;
    padding: 0;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:active{
        background-color: ${props => props.theme.color.dark_hover_1}
    }

    & > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    & > svg {
        fill: ${props => props.theme.color.dark_svg_1};
    }
`

export const List = styled.ul`
    display: flex;
    align-items: center;
    column-gap: 0.625rem;
    list-style: none;
`