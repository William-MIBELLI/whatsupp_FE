import styled, { css } from "styled-components";

const Me = css`
    background-color: ${props => props.theme.color.green_3};
    margin-left: auto;
`

const NotMe = css`
    background-color: ${props => props.theme.color.dark_bg_3};
    margin-right: auto;
`

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 5px auto;
    padding: 5px;
    border-radius: 5px;

    ${({me}) => me ? Me : NotMe};
`

export const Mini = styled.img`
    height: 50px;
    width: 50px;
`

export const Description = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
`