import styled from 'styled-components'

export const StyledAuthInput = styled.div`
    margin-top: 0.8rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.color.dark_text_1};

    & > * {
        margin-top: 0.25rem;
    }

    label {
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: bold;
        letter-spacing: 0.025em;
    }

    input {
        background-color: ${props => props.theme.color.dark_bg_3};
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        outline: none;
        font-size: 1rem;
        line-height: 1.5em;
        border: none;
        color: white;
    }
`

export const ErrorMessage = styled.p`
    color: red;
    font-size: 0.7rem;
    margin: 0;
`
