
import styled from 'styled-components'

export const Wrapper = styled.div`
    color: white;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`
export const Container = styled.div`
    width: 100%;
    max-width: 760px;
    min-width: 420px;
    padding: 1.5rem;
    background-color: ${props => props.theme.color.dark_bg_2};
    border-radius: 0.75rem;

    & > * {
        margin-top: 2rem;
    }

`

export const Header = styled.div`
    text-align: center;
    color: ${props => props.theme.color.dark_text_1}
`

export const Title = styled.h2`
    text-align: center;
    font-weight: bold;
    font-size: 1.875rem;
    line-height: 2.25rem;
    margin-bottom: 0.5rem;
`

export const Description = styled.p`
    margin-top: 0;
    font-size: 0.875rem;
    color: ${props => props.theme.color.dark_text_2};
`