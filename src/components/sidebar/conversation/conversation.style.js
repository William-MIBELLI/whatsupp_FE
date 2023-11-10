import styled, { css } from 'styled-components'
import SecondaryText from '../../secondary-text/secondaryText'
import PrimaryText from '../../primary-text/primaryText'
import { theme } from '../../../utils/theme'

const { color } = theme

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
    justify-content: flex-start;
    width: 70%;
    box-sizing: border-box
`

export const ImgContainer = styled.div`
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    background-color: blue;

    & img {
        width: 100%;
        height: 100%;
    }

    border: ${({isOnline}) => isOnline ? `4px solid ${color.green_1}` : ''};
`

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    text-align: left;
    margin-left: 1rem;
    
    width: 70%;

`

export const ContactName = styled(PrimaryText)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
`

export const LastMessage = styled(SecondaryText)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
`

export const RightSide = styled.div`
    display: flex;
    align-items: right;
    padding: 0 19px;
    font-size: small;
    color: ${props => props.theme.color.dark_text_2};
`

export const TypingText = styled.p`
    color: ${props => props.theme.color.green_1};
    font-size: 0.9rem;
    margin: 0;
`