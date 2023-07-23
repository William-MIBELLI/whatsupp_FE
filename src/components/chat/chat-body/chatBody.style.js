import styled from 'styled-components'

export const Component = styled.div`
    width: 100%;
    max-height: calc(100% - 130px);
    min-height: calc(100% - 130px);
    background: url(${({ BgUrl }) => BgUrl});
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
`

export const Container = styled.div`
    overflow: auto;
    padding: 2rem;

    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px;
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.color.dark_bg_5};
    }
`