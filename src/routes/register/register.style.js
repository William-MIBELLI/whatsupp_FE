import styled from "styled-components";

export const Footer = styled.div`
    a {
        color: ${props => props.theme.text_1};
        text-decoration: none;

        &:hover {
            font-weight: bold;
            text-decoration: underline;
        }
    }

`;

export const Description = styled.p`
    margin-bottom: 0.5rem;
    font-style: italic;
    color: ${(props) => props.theme.text_3};
`
