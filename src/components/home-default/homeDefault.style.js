import styled from "styled-components";
import { Logo } from "../../svg";

export const Component = styled.main`
    width: 100%;
    background-color: ${(props) => props.theme.bg_5};
    border-bottom: 6px solid ${(props) => props.theme.green_2};
    border-left: 2px solid ${(props) => props.theme.border_1};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledLogo = styled(Logo)`
    width: 80%;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        font-weight: 100;
        color: ${(props) => props.theme.text_1};
    }

    p {
        margin: 0;
    }

    @media only screen and (max-width: 500px){
        p{
            font-size: 0.6rem;
        }
        h1{
            font-size: 1.5rem;
        }
    }
`;
