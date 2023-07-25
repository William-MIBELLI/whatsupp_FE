import styled from 'styled-components'

export const Component = styled.main`
    width: 100%;
    background-color: ${props => props.theme.color.dark_bg_4};
    border-bottom: 6px solid ${props => props.theme.color.green_2};
    border-left: 2px solid ${props => props.theme.color.dark_border_2};
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1{
        font-weight: 100;
        color: ${props => props.theme.color.dark_text_1};
    }

    p{
        margin: 0;
    }
`