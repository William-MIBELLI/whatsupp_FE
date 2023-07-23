import styled, { css } from 'styled-components'

export const Component = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${props => props.theme.color.dark_border_1};
    cursor: pointer;
    
    &:hover {
        background-color: ${props => props.theme.color.dark_bg_2}
    }
`

export const LeftSide = styled.div`
    padding: 0 19px;
    display: flex;
    align-items: center;
`

export const ImgContainer = styled.div`
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;

    & img {
        width: 100%;
        height: 100%;
    }
`

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    text-align: left;
    margin-left: 1rem;
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const RightSide = styled.div`
    display: flex;
    align-items: right;
    padding: 0 19px;
    font-size: small;
    color: ${props => props.theme.color.dark_text_2}
`