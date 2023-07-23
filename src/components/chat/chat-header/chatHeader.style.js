import styled from 'styled-components'

export const Component = styled.div`
    width: 100%;
    height: 70px;
    background-color: ${props => props.theme.color.dark_bg_2};
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Side = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 20px;

    svg{
        fill: ${props => props.theme.color.dark_svg_1};
    }
`
export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;

    p:last-child {
        font-size: 0.7rem;
        color: ${props => props.theme.color.green_1};
    }
`
