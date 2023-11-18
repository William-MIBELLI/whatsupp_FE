import styled from "styled-components";

export const Component = styled.div`
    max-height: calc(100vh - 310px);
    overflow-y: auto;
    

    &::-webkit-scrollbar {
        width: 5px;
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.bg_2};
    }

    @media only screen and (max-width: 900px){
        max-height: calc(100vh - 230px)
    }

`;
