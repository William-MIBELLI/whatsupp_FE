import styled from "styled-components";

export const Component = styled.div`
    width: 100%;
    height: 70px;
    background-color: ${(props) => props.theme.chat_header};
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
`;

export const Side = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 20px;
    height: 100%;

    svg {
        fill: ${(props) => props.theme.svg_1};
    }
`;
export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    text-align: left;

    p:last-child {
        font-size: 0.7rem;
        color: ${(props) => props.theme.green_1};
    }
`;
