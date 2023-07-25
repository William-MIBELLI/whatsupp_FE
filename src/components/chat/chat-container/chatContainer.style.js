import styled from 'styled-components'

export const Component = styled.div`
    width: 100%;
    min-height: 80%;
    border-left: 2px solid ${props => props.theme.color.dark_border_2};
    position: relative;
`