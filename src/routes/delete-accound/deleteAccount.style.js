import styled from "styled-components";
import { theme } from "../../utils/theme";
import PrimaryText from "../../components/primary-text/primaryText";
import Button from "../../components/button/button";

const { color } = theme

export const Component = styled.div``

export const Container = styled.div`
    background-color: ${color.dark_bg_2};
    border-left:2px solid ${color.dark_border_1};
    width: 100%;
`

export const Title = styled.h1`
    color: ${color.dark_text_1};
`

export const Disclaimer = styled(PrimaryText)`
    color: ${color.red_1};
`
export const Form = styled.form`
    width: 60%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;    
`

export const DeleteButton = styled(Button)`
    background-color: ${color.red_1};
    &:hover{
        background-color: red;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`