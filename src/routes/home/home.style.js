import styled from "styled-components";

export const StyledHome = styled.div`
    height: 100vh;
    background-color: ${(props) => props.theme.bg_1};
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

export const Container = styled.div`
    width: 1700px;
    height: 100%;
    display: flex;
    padding: 40px;
    box-sizing: border-box;

    @media only screen and (max-width: 900px){
        padding: 0;
    }
`;
