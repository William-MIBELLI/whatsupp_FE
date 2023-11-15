import styled from "styled-components";

export const Component = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: ${props => props.theme.bg_1};
    display: flex;
    justify-content: center;
    align-items: center;
`;
