import styled from "styled-components";

export const Component = styled.div`
    height: 90px;
    background-color: ${(props) => props.theme.bg_3};
    display: flex;
    align-items: center;
    padding: 13px;

    & svg {
        cursor: pointer;
    }
`;

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    & svg {
        fill: ${(props) => props.theme.blue_1};
    }
`;

export const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.4rem;
    text-align: left;
    font-weight: 400;
    width: 80%;
`;

export const Input = styled.input`
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    width: 100%;
    box-sizing: border-box;
    border: none;
    outline: none;
    background-color: ${props => props.theme.bg_5};
    color: white;

    &::placeholder {
        color: ${props => props.theme.green_2};
    }
`;

export const RightSide = styled.div`
    & svg {
        fill: ${(props) => props.theme.svg_2};
    }
`;
