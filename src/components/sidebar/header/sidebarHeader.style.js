import styled from "styled-components";

export const Component = styled.div`
    height: 50px;
    background-color: ${(props) => props.theme.bg_sidebar_header};
    display: flex;
    align-items: center;
    padding: 0 16px;
    position: relative;
`;

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const HomeButton = styled.button`
    max-width: 40px;
    max-height: 40px;
    min-width: 40px;
    min-height: 40px;
    border-radius: 50%;
    margin: 0;
    border: none;
    padding: 0;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:active {
        background-color: ${(props) => props.theme.hover_1};
    }

    & > img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    & > svg {
        fill: ${(props) => props.theme.svg_1};
    }
`;

export const List = styled.ul`
    display: flex;
    align-items: center;
    column-gap: 0.625rem;
    list-style: none;
`;

export const SwitchIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: auto;
    height: 100%;
    width: 100%;
`