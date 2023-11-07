import styled from 'styled-components'
import { theme } from '../../../utils/theme'

const { color } = theme

export const Component = styled.div`
    height: 90px;
    background-color: ${props => props.theme.color.dark_bg_3};
    display: flex;
    align-items: center;
    padding: 13px;

    & svg{
        cursor: pointer;
    }
`

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    & svg {
        fill : ${props => props.theme.color.blue_1}
    }
`

export const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.4rem;
    text-align: left;
    font-weight: 400;
    width: 80%;
`

export const Input = styled.input`
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    width: 100%;
    box-sizing: border-box;
    border: none;
    outline: none;
    background-color: ${color.dark_bg_5};
    color: white;

    &::placeholder{
        color: ${color.green_2};
    }
`


export const RightSide = styled.div`
    & svg {
        fill: ${props => props.theme.color.dark_svg_2};
    }
`