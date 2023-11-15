import styled from 'styled-components'
import SecondaryText from '../../components/secondary-text/secondaryText'

export const Footer = styled.div`

    a {
        color: ${props => props.theme.text_1};
        text-decoration: none;

        &:hover{
            font-weight: bold;
            text-decoration: underline;
        }
    }

`

export const Description = styled.p`
margin-bottom: 0.5rem;
        font-style: italic;
        color: ${props => props.theme.text_2};
`

export const ForgetPassDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
`

export const ForgetPassText = styled(SecondaryText)`
    cursor: pointer;

    &:hover{
        font-weight: bold;
        color: ${props => props.theme.text_1};
    }
`

