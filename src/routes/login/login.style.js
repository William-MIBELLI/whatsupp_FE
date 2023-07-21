import styled from 'styled-components'

export const Footer = styled.div`

    a {
        color: white;
        text-decoration: none;

        &:hover{
            font-weight: bold;
            text-decoration: underline;
        }
    }

    p {
        margin-bottom: 0.5rem;
        font-style: italic;
        color: ${props => props.theme.color.dark_text_3};
    }
`