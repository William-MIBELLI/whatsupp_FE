import styled from 'styled-components'
import Button from '../../button/button'

export const StyledPicture = styled.div`
    background-color: ${props => props.theme.color.dark_bg_6};
    border-radius: 0.5rem;
    color: ${props => props.theme.color.dark_text_5};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    padding: 0.5rem 1rem;
`

export const PreviewImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 0;
`

export const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`
export const RemoveButton = styled(Button)`
    padding: 0.4rem 0.7rem;
    background-color: ${props => props.theme.color.dark_bg_1};
    width: auto;
    margin-top: 0.5rem;

    &:hover{
        background-color: ${props => props.theme.color.red_1};
    }
`