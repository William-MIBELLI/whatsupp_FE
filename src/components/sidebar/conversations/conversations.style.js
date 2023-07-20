import styled from 'styled-components'

export const Component = styled.div`
    max-height: calc(100vh - 220px);
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px;
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.color.dark_bg_2};
    }
`