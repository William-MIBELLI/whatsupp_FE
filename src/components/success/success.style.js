import styled from "styled-components";

export const Container = styled.div`
    width: 400px;
    background-color: ${(props) => props.theme.bg_2};
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    padding: 10px;

    * {
        margin: 15px 0;
    }

    p {
        margin: 0;
    }
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    > * {
        margin-top: 0;
    }
`;

export const Title = styled.h2`
    font-size: 1.825rem;
    color: white;
    font-weight: bold;
`;
