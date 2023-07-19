import styled from 'styled-components'

export const BaseButton = styled.button`
    width: 100%;
    text-align: center;
    background-color: ${props => props.theme.color.green_1};
    padding: 1rem;
    color: lightgrey;
    font-weight: bold;
    border-radius: 2rem;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover{
        background-color: ${props => props.theme.color.green_2};
    }
`

export const HomeButton = styled(BaseButton)`
    width: 40px;
    height: 40px;
    border-radius: 50%;

    &:active{
        background-color: ${props => props.theme.color.dark_hover_1}
    }
`