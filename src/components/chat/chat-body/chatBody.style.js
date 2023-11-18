import styled from "styled-components";

export const Component = styled.div`
    width: 100%;
    max-height: calc(100% - 130px);
    min-height: calc(100% - 130px);
    background: url(${props => props.theme.bg_url});
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
`;

export const Container = styled.div`
    overflow: auto;
    padding: 2rem;
    position: relative;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px;
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.bg_5};
    }
`;

export const EndDiv = styled.div`
    margin: 0;
    padding: 0;
    height: 0;
`;

// export const SpinnerContainer = styled.div`
//     margin: auto;
//     background-color: red;
// `