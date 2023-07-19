import styled from 'styled-components'

export const Component = styled.div`
    height: 90px;
    background-color: ${props => props.theme.color.dark_bg_3};
    display: flex;
    align-items: center;
    padding: 13px;

    & svg{
        cursor: pointer;
    }
`

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & svg {
        fill : ${props => props.theme.color.blue_1}
    }
`

export const LeftSide = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    text-align: left;
    font-weight: 400;

`

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const PrimaryText = styled.span`
    font-size: 16px;
    line-height: 21px;
    color: ${props => props.theme.color.dark_text_1};
`

export const SecondaryText = styled.span`
    font-size: 14px;
    line-height: 19px;
    color: ${props => props.theme.color.dark_text_2};
    margin-top: 0.5rem;
`

export const RightSide = styled.div`
    & svg {
        fill: ${props => props.theme.color.dark_svg_2};
    }
`