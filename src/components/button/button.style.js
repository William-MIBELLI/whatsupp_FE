import styled from 'styled-components'

export const BaseButton = styled.button`
    width: 100%;
    text-align: center;
    background-color: ${props => props.theme.green_1};
    padding: 1rem;
    color: ${props => props.theme.text_1};
    font-weight: bold;
    border-radius: 2rem;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover{
        background-color: ${props => props.theme.green_2};
    }
`

export const HomeButton = styled(BaseButton)`
    width: 40px;
    height: 40px;
    border-radius: 50%;

    &:active{
        background-color: ${props => props.theme.hover_1}
    }
`
