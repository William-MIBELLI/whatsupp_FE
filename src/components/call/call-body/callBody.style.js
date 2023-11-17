import styled, { css } from "styled-components";

export const Container = styled.div`
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
`

export const PartnerVideoContainer = styled.video`
    width: 100%;
    height: 100%;
`


export const MyVideoContainer = styled.video`
    position: absolute;
    background-color: black;
    width: 100px;
    height: 150px;
    border-radius: 5px;
    border: 1px solid white;
    bottom: 20px;
    right: 20px;
    transition: all 0.2s ease-in;

    ${({$showfooter}) => $showfooter ? TranslateVideo : ''}
`

export const TranslateVideo = css`
    bottom: 100px;
`