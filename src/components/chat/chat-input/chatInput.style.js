import styled from 'styled-components'

export const Component = styled.input`
    width: 100%;
    outline: none;
    border: none;
    height: 30px;
    margin: 0 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.color.dark_bg_4};
    padding-left: 16px;
    color: ${props => props.theme.color.dark_text_1};

    &::placeholder{
        color: ${props => props.theme.color.dark_text_3};
    }
`