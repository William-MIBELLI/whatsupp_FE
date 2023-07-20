import styled from 'styled-components'

export const StyledHome = styled.div`
    min-height: 100vh;
    background-color: ${props => props.theme.color.dark_bg_1};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 19px 0;
`

export const Container = styled.div`
    width: 1700px;
    height: 100%;
    display: flex;
`