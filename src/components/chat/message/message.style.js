import styled, { css } from 'styled-components'

const Me = css`
    background-color: ${props => props.theme.color.green_2};
    margin-left: auto;
`

const NotMe = css`
    background-color: ${props => props.theme.color.dark_bg_2};
    margin-right: auto;
`

export const Component = styled.div`
    color: white;
    padding: 15px 10px;
    max-width: 45%;
    text-align: justify;
    width: fit-content;
    margin-top: 10px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    word-break: break-all;

    ${({me}) => me ? Me : NotMe};
`

export const Content = styled.div`
    margin-right: auto;
    padding-right: 30px;
`

export const DateContainer = styled.div`
    margin-left: auto;
    font-size: small;
    font-weight: 100;
    color: ${props => props.theme.color.dark_text_5};
`