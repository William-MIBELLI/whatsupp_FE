import styled, { css } from "styled-components";

export const StyledSidebar = styled.div`
    user-select: none;
    overflow-y: hidden;
    background-color: ${(props) => props.theme.bg_sidebar};

`;

export const Component = styled.aside`
    width: 40%;
    max-width: 450px;
    min-width: 240px;
    height: 100%;
    position: relative;
    z-index: 1000;

    @media only screen and (max-width: 650px) {
        ${({$hide}) => $hide ? Hide : Display};
    }
`;

const Hide = css`
    width: 0;
    min-width: 0;
`

const Display = css`
    position: absolute;
    height: 100%;
    width: 80vw;
    height: 100vh;
    max-width: 100%;
    background-color: ${props => props.theme.bg_sidebar};
    background-color: blue;
`

// export const StyledSidebar = styled.div`
//     width: 40%;
//     max-width: 450px;
//     min-width: 240px;
//     height: 100%;
//     user-select: none;
//     overflow-y: hidden;
//     position: relative;
//     background-color: ${props => props.theme.bg_sidebar};

//     @media only screen and (max-width: 650px){
//         display: none;
//     }

// `
