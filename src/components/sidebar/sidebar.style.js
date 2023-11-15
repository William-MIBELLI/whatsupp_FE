import styled from 'styled-components'

export const StyledSidebar = styled.div`
    width: 40%;
    max-width: 450px;
    min-width: 240px;
    height: 100%;
    user-select: none;
    overflow-y: hidden;
    background-color: ${props => props.theme.bg_sidebar}; 
`

