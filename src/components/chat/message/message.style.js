import styled, { css } from "styled-components";

const Me = css`
    background-color: ${(props) => props.theme.green_2};
    margin-left: auto;
`;

const NotMe = css`
    background-color: ${(props) => props.theme.bg_2};
    margin-right: auto;
`;

export const Component = styled.div`
    color: ${props => props.theme.text_1};
    padding: 15px 10px;
    max-width: 65%;
    text-align: justify;
    width: fit-content;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    word-break: break-word;

    ${({ $me }) => ($me ? Me : NotMe)};
`;

export const Content = styled.div`
    margin-right: auto;
    padding-right: 30px;
`;

export const DateContainer = styled.div`
    margin-left: auto;
    font-size: small;
    font-weight: bold;
    color: ${(props) => props.theme.text_5};
`;

export const SenderPic = styled.img`
    border-radius: 50%;
    height: 30px;
    width: 30px;
    margin-right: 5px;
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;
